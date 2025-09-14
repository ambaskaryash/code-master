import React, { useState, useEffect } from 'react';
import { IoClose, IoShieldCheckmark, IoWarning, IoCopy, IoCheckmark } from 'react-icons/io5';
import { FaQrcode, FaKey } from 'react-icons/fa';
import { TwoFactorAuth, TwoFactorSetup } from '@/utils/two-factor-auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { validationSchemas, SecurityValidator } from '@/utils/security-validation';

interface TwoFactorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetupComplete: () => void;
}

const TwoFactorSetupModal: React.FC<TwoFactorSetupModalProps> = ({
  isOpen,
  onClose,
  onSetupComplete
}) => {
  const [user] = useAuthState(auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState<TwoFactorSetup | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (isOpen && user?.email) {
      generateSecret();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user?.email]); // generateSecret is a stable function

  const generateSecret = async () => {
    if (!user?.email) return;
    
    try {
      setIsLoading(true);
      const setup = await TwoFactorAuth.generateSecret(user.email);
      setSetupData(setup);
    } catch (error) {
      console.error('Error generating 2FA secret:', error);
      toast.error('Failed to generate 2FA setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => ({ ...prev, [label]: true }));
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [label]: false }));
      }, 2000);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleVerification = async () => {
    if (!user?.uid || !setupData || !verificationCode) return;

    // Validate 2FA code
    const validation = SecurityValidator.validateInput(
      { twoFactorCode: verificationCode },
      validationSchemas.twoFactorCode
    );

    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await TwoFactorAuth.enableTwoFactor(
        user.uid,
        setupData.secret,
        verificationCode,
        setupData.backupCodes
      );

      if (result.success) {
        toast.success('Two-Factor Authentication enabled successfully!');
        setCurrentStep(3); // Show backup codes
      } else {
        toast.error(result.error || 'Failed to enable 2FA');
      }
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      toast.error('Failed to enable 2FA. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSetupData(null);
    setVerificationCode('');
    setCopiedItems({});
    onClose();
  };

  const handleComplete = () => {
    handleClose();
    onSetupComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-dark-layer-1 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <IoShieldCheckmark className="text-blue-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-white">Enable Two-Factor Authentication</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Introduction and QR Code */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <FaQrcode className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Scan QR Code</h3>
                <p className="text-gray-400 text-sm">
                  Use your authenticator app (Google Authenticator, Authy, etc.) to scan this QR code
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                </div>
              ) : setupData ? (
                <div className="space-y-4">
                  {/* QR Code */}
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                    <div className="relative w-48 h-48">
                      <img
                        src={setupData.qrCodeUrl}
                        alt="2FA QR Code"
                        className="w-48 h-48"
                        width={192}
                        height={192}
                      />
                    </div>
                  </div>

                  {/* Manual Entry */}
                  <div className="bg-dark-layer-2 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaKey className="text-yellow-400 w-4 h-4" />
                      <span className="text-sm font-medium text-gray-300">Manual Entry Key</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 text-xs text-white bg-dark-layer-3 px-3 py-2 rounded break-all">
                        {setupData.manualEntryKey}
                      </code>
                      <button
                        onClick={() => copyToClipboard(setupData.manualEntryKey, 'Manual key')}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedItems['Manual key'] ? (
                          <IoCheckmark className="w-5 h-5 text-green-400" />
                        ) : (
                          <IoCopy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    I&apos;ve Added the Account
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {/* Step 2: Verification */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <IoShieldCheckmark className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Enter Verification Code</h3>
                <p className="text-gray-400 text-sm">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-dark-layer-2 border border-gray-600 rounded-lg text-white text-center text-xl tracking-widest focus:outline-none focus:border-blue-400"
                  maxLength={6}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleVerification}
                  disabled={verificationCode.length !== 6 || isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Enable'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Backup Codes */}
          {currentStep === 3 && setupData && (
            <div className="space-y-6">
              <div className="text-center">
                <IoWarning className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Save Your Backup Codes</h3>
                <p className="text-gray-400 text-sm">
                  Store these backup codes in a safe place. You can use them to access your account if you lose your phone.
                </p>
              </div>

              <div className="bg-dark-layer-2 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">Backup Codes</span>
                  <button
                    onClick={() => copyToClipboard(setupData.backupCodes.join('\n'), 'Backup codes')}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                  >
                    {copiedItems['Backup codes'] ? (
                      <>
                        <IoCheckmark className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <IoCopy className="w-4 h-4" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {setupData.backupCodes.map((code, index) => (
                    <code
                      key={index}
                      className="text-xs text-white bg-dark-layer-3 px-3 py-2 rounded text-center"
                    >
                      {code}
                    </code>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <IoWarning className="text-yellow-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    <p className="font-medium mb-1">Important:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Each backup code can only be used once</li>
                      <li>• Store them securely - we cannot recover them</li>
                      <li>• You can regenerate new codes anytime in settings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                I&apos;ve Saved My Backup Codes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetupModal;