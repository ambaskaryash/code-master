#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Firebase configuration...');
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);

console.log('');
console.log('⚠️ This script requires Firebase Admin SDK setup.');
console.log('📋 To check Firebase connection, please:');
console.log('1. Open http://localhost:3000 in your browser');
console.log('2. Open browser DevTools (F12)');
console.log('3. Go to Console tab');
console.log('4. Run: window.debugFirebase()');
console.log('');
console.log('🌱 To seed problems:');
console.log('1. Visit http://localhost:3000/admin/seed');
console.log('2. Click "Seed All Problems" button');
console.log('');
console.log('🔧 Current environment variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('NEXT_PUBLIC_FIREBASE_'))
  .forEach(key => {
    console.log(`${key}=${process.env[key]}`);
  });