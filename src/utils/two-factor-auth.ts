import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  manualEntryKey: string;
  backupCodes: string[];
}

export interface TwoFactorData {
  secret: string;
  isEnabled: boolean;
  backupCodes: string[];
  createdAt: number;
  lastUsed?: number;
}

export class TwoFactorAuth {
  private static readonly APP_NAME = 'CodeMaster';
  private static readonly ISSUER = 'CodeMaster Learning Platform';

  /**
   * Generate a new 2FA secret and QR code for user setup
   */
  static async generateSecret(userEmail: string): Promise<TwoFactorSetup> {
    // Generate secret
    const secret = speakeasy.generateSecret({
      name: userEmail,
      issuer: this.ISSUER,
      length: 32
    });

    // Generate QR code URL
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    // Generate backup codes
    const backupCodes = this.generateBackupCodes();

    return {
      secret: secret.base32,
      qrCodeUrl,
      manualEntryKey: secret.base32,
      backupCodes
    };
  }

  /**
   * Generate backup codes for account recovery
   */
  static generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      // Generate 8-character alphanumeric codes
      const code = Math.random().toString(36).substr(2, 4) + 
                   Math.random().toString(36).substr(2, 4);
      codes.push(code.toUpperCase());
    }
    return codes;
  }

  /**
   * Verify a TOTP token
   */
  static verifyToken(secret: string, token: string, window: number = 1): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window // Allow 1 time step tolerance (30 seconds before/after)
    });
  }

  /**
   * Verify a backup code
   */
  static verifyBackupCode(backupCodes: string[], inputCode: string): { 
    isValid: boolean; 
    remainingCodes: string[] 
  } {
    const normalizedInput = inputCode.toUpperCase().replace(/\s/g, '');
    const codeIndex = backupCodes.indexOf(normalizedInput);
    
    if (codeIndex === -1) {
      return { isValid: false, remainingCodes: backupCodes };
    }

    // Remove used backup code
    const remainingCodes = [...backupCodes];
    remainingCodes.splice(codeIndex, 1);

    return { isValid: true, remainingCodes };
  }

  /**
   * Enable 2FA for a user after verification
   */
  static async enableTwoFactor(
    userId: string, 
    secret: string, 
    verificationToken: string,
    backupCodes: string[]
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Verify the token first
      if (!this.verifyToken(secret, verificationToken)) {
        return { success: false, error: 'Invalid verification code' };
      }

      // Save to user document
      const userRef = doc(firestore, 'users', userId);
      const twoFactorData: TwoFactorData = {
        secret,
        isEnabled: true,
        backupCodes,
        createdAt: Date.now()
      };

      await updateDoc(userRef, {
        twoFactor: twoFactorData,
        updatedAt: Date.now()
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error enabling 2FA:', error);
      return { success: false, error: 'Failed to enable 2FA' };
    }
  }

  /**
   * Disable 2FA for a user
   */
  static async disableTwoFactor(
    userId: string, 
    verificationToken: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        return { success: false, error: 'User not found' };
      }

      const userData = userDoc.data();
      const twoFactorData = userData.twoFactor as TwoFactorData;

      if (!twoFactorData || !twoFactorData.isEnabled) {
        return { success: false, error: '2FA is not enabled' };
      }

      // Verify token or backup code
      const isTokenValid = this.verifyToken(twoFactorData.secret, verificationToken);
      const backupResult = this.verifyBackupCode(twoFactorData.backupCodes, verificationToken);

      if (!isTokenValid && !backupResult.isValid) {
        return { success: false, error: 'Invalid verification code' };
      }

      // Disable 2FA
      await updateDoc(userRef, {
        'twoFactor.isEnabled': false,
        'twoFactor.disabledAt': Date.now(),
        updatedAt: Date.now()
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error disabling 2FA:', error);
      return { success: false, error: 'Failed to disable 2FA' };
    }
  }

  /**
   * Authenticate with 2FA
   */
  static async authenticate2FA(
    userId: string,
    token: string
  ): Promise<{ success: boolean; error?: string; backupCodesRemaining?: number }> {
    try {
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        return { success: false, error: 'User not found' };
      }

      const userData = userDoc.data();
      const twoFactorData = userData.twoFactor as TwoFactorData;

      if (!twoFactorData || !twoFactorData.isEnabled) {
        return { success: false, error: '2FA is not enabled' };
      }

      // Try TOTP verification first
      if (this.verifyToken(twoFactorData.secret, token)) {
        // Update last used timestamp
        await updateDoc(userRef, {
          'twoFactor.lastUsed': Date.now()
        });
        
        return { success: true };
      }

      // Try backup code verification
      const backupResult = this.verifyBackupCode(twoFactorData.backupCodes, token);
      if (backupResult.isValid) {
        // Update backup codes (remove used one)
        await updateDoc(userRef, {
          'twoFactor.backupCodes': backupResult.remainingCodes,
          'twoFactor.lastUsed': Date.now()
        });

        return { 
          success: true, 
          backupCodesRemaining: backupResult.remainingCodes.length 
        };
      }

      return { success: false, error: 'Invalid 2FA code' };
    } catch (error: any) {
      console.error('Error authenticating 2FA:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Check if user has 2FA enabled
   */
  static async isEnabled(userId: string): Promise<boolean> {
    try {
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        return false;
      }

      const userData = userDoc.data();
      const twoFactorData = userData.twoFactor as TwoFactorData;

      return twoFactorData?.isEnabled === true;
    } catch (error) {
      console.error('Error checking 2FA status:', error);
      return false;
    }
  }

  /**
   * Generate new backup codes
   */
  static async regenerateBackupCodes(
    userId: string,
    verificationToken: string
  ): Promise<{ success: boolean; backupCodes?: string[]; error?: string }> {
    try {
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        return { success: false, error: 'User not found' };
      }

      const userData = userDoc.data();
      const twoFactorData = userData.twoFactor as TwoFactorData;

      if (!twoFactorData || !twoFactorData.isEnabled) {
        return { success: false, error: '2FA is not enabled' };
      }

      // Verify current 2FA token
      if (!this.verifyToken(twoFactorData.secret, verificationToken)) {
        return { success: false, error: 'Invalid verification code' };
      }

      // Generate new backup codes
      const newBackupCodes = this.generateBackupCodes();

      // Update user document
      await updateDoc(userRef, {
        'twoFactor.backupCodes': newBackupCodes,
        'twoFactor.lastBackupRegeneration': Date.now(),
        updatedAt: Date.now()
      });

      return { success: true, backupCodes: newBackupCodes };
    } catch (error: any) {
      console.error('Error regenerating backup codes:', error);
      return { success: false, error: 'Failed to regenerate backup codes' };
    }
  }

  /**
   * Get 2FA status and backup codes count
   */
  static async getStatus(userId: string): Promise<{
    isEnabled: boolean;
    backupCodesCount?: number;
    createdAt?: number;
    lastUsed?: number;
  }> {
    try {
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        return { isEnabled: false };
      }

      const userData = userDoc.data();
      const twoFactorData = userData.twoFactor as TwoFactorData;

      if (!twoFactorData) {
        return { isEnabled: false };
      }

      return {
        isEnabled: twoFactorData.isEnabled,
        backupCodesCount: twoFactorData.backupCodes?.length || 0,
        createdAt: twoFactorData.createdAt,
        lastUsed: twoFactorData.lastUsed
      };
    } catch (error) {
      console.error('Error getting 2FA status:', error);
      return { isEnabled: false };
    }
  }
}