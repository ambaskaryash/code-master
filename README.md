# 🎓 CodeMaster - Advanced LeetCode Clone

> **Enterprise-grade coding practice platform with comprehensive security, DevOps challenges, and integrated learning resources**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Security](https://img.shields.io/badge/Security-A+-green?logo=shield)]()
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)

## 📸 Screenshots

![CodeMaster Homepage](https://i.ibb.co/b3XDkdN/Full-Stack-1.png)

## 🌟 **What Makes CodeMaster Special**

CodeMaster is not just another coding practice platform. It's a **comprehensive learning ecosystem** that combines:

- 🎯 **Traditional Algorithm Problems** - Classic LeetCode-style challenges
- 🏗️ **DevOps & Infrastructure** - Real-world system administration tasks
- 🗄️ **Database & SQL** - Advanced database management challenges
- 🐳 **Containerization** - Docker and orchestration problems
- 🛡️ **Enterprise Security** - Bank-level authentication and protection
- 📺 **Integrated Learning** - YouTube solution videos for every problem

## ✨ **Core Features**

### 🎯 **Problem Solving Platform**
- **15 Curated Problems** across multiple domains
- **Smart Filtering** by difficulty, category, and completion status
- **Advanced Search** with tag-based filtering
- **Progress Tracking** with visual statistics
- **Responsive Design** for all devices

### 📚 **Problem Categories**

#### 🧮 **Algorithm & Data Structures (11 Problems)**
- **Arrays**: Two Sum, Best Time to Buy and Sell Stock
- **Linked Lists**: Reverse Linked List
- **Strings**: Longest Substring Without Repeating Characters
- **Dynamic Programming**: Jump Game
- **Stacks**: Valid Parentheses
- **Binary Search**: Search a 2D Matrix
- **Two Pointers**: Container With Most Water
- **Intervals**: Merge Intervals
- **Trees**: Maximum Depth of Binary Tree
- **Backtracking**: Subsets

#### 🏗️ **DevOps & Infrastructure (4 Problems)**
- **Monitoring**: Prometheus & Alerting setup
- **SQL Analytics**: Complex queries and window functions
- **Docker**: Multi-service application stacks
- **Database**: Safe migration scripts

### 🎬 **Integrated Learning System**
- **YouTube Integration** - Every problem has a solution video
- **Modal Video Player** - Watch tutorials without leaving the platform
- **Responsive Player** - Optimized for all screen sizes
- **Lazy Loading** - Videos load only when needed

### 🛡️ **Enterprise-Grade Security**

#### 🔐 **Authentication & Authorization**
- **Firebase Authentication** - Secure email/password login
- **Two-Factor Authentication (2FA)** - TOTP with backup codes
- **QR Code Setup** - Easy authenticator app integration
- **Session Management** - Secure user sessions

#### 🛡️ **Advanced Security Features**
- **DDoS Protection** - Multi-tier rate limiting with IP tracking
- **Input Validation** - Comprehensive sanitization against all attacks
- **SQL Injection Prevention** - Zero vulnerability with NoSQL + validation
- **XSS Protection** - Content Security Policy + input sanitization
- **Security Monitoring** - Real-time threat detection and logging
- **Secure Headers** - CSP, HSTS, X-Frame-Options, and more

### 📊 **User Experience**

#### 🎨 **Modern UI/UX**
- **Dark Theme** - Easy on the eyes for long coding sessions
- **Gradient Branding** - Beautiful CodeMaster visual identity
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Loading States** - Smooth transitions and feedback
- **Toast Notifications** - Real-time user feedback

#### 🔍 **Advanced Features**
- **Smart Search** - Find problems by title or tags
- **Multi-Filter System** - Difficulty, category, and status filters
- **Progress Statistics** - Visual progress tracking
- **Problem Stats** - Likes, difficulty distribution
- **Keyboard Shortcuts** - ESC to close modals, etc.

## 🏗️ **Technical Architecture**

### 🛠️ **Tech Stack**

#### **Frontend**
- **⚡ Next.js 15.5.3** - React framework with SSR and ISR
- **🔷 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **⚛️ React 18** - Latest React with concurrent features
- **🔄 Recoil** - State management
- **🎬 React YouTube** - Embedded video player

#### **Backend & Database**
- **🔥 Firebase** - Authentication and Firestore database
- **🏠 Firestore** - NoSQL document database
- **🔐 Firebase Auth** - User authentication service
- **📊 Real-time Database** - Live data synchronization

#### **Security & Performance**
- **🛡️ Custom Middleware** - Rate limiting and security headers
- **🔒 Input Validation** - Joi, DOMPurify, Validator.js
- **📊 Security Monitoring** - Custom threat detection system
- **⚡ Optimized Bundles** - Next.js production optimization

### 📁 **Project Structure**
```
src/
├── components/           # Reusable UI components
│   ├── Modals/          # Authentication and 2FA modals
│   ├── Navbar/          # Navigation components
│   └── ProblemsTable/   # Main problems interface
├── pages/               # Next.js pages
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── admin/           # Admin seeding tools
│   └── problems/        # Problem pages
├── utils/               # Utility functions
│   ├── security/        # Security validation and monitoring
│   ├── two-factor-auth/ # 2FA implementation
│   └── seed-database/   # Database seeding utilities
├── firebase/            # Firebase configuration
├── atoms/               # Recoil state management
├── mockProblems/        # Problem definitions
└── middleware.ts        # Next.js middleware for security
```

## 🚀 **Getting Started**

### 📋 **Prerequisites**
- **Node.js 18+** - JavaScript runtime
- **npm/yarn** - Package manager
- **Firebase Project** - Google Firebase account

### 🔧 **Installation**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd leetcode-clone-youtube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   ```

4. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Configure security rules (see `firebase/firestore.rules`)

5. **Seed the database**
   ```bash
   # Start the development server first
   npm run dev
   
   # Then visit the admin seeding page
   # http://localhost:3000/admin/seed
   # Click "Seed All Problems"
   ```

6. **Deploy Firestore security rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

### 🎯 **Development**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📖 **Usage Guide**

### 👤 **For Users**

1. **Registration**
   - Visit `/auth` and click "Sign In"
   - Switch to "Register" tab
   - Enter secure credentials (password requirements enforced)
   - Optional: Set up 2FA for enhanced security

2. **Problem Solving**
   - Browse problems on the homepage
   - Use filters to find specific types
   - Click YouTube icons to watch solution videos
   - Click "Solve" to attempt problems

3. **Progress Tracking**
   - View statistics at the top of the homepage
   - Track solved problems with green checkmarks
   - Monitor progress across different categories

### 👨‍💼 **For Administrators**

1. **Database Management**
   - Visit `/admin/seed` for database seeding
   - Use "Seed All Problems" for complete setup
   - Individual seeding options available

2. **Security Monitoring**
   - Check browser console for security events
   - Monitor rate limiting in action
   - Review authentication attempts

## 🛡️ **Security Features**

### 🔒 **Authentication Security**
- **Password Requirements**: 8+ characters, mixed case, numbers, symbols
- **Email Verification**: Firebase email verification
- **Session Security**: Secure session management
- **2FA Protection**: Time-based one-time passwords
- **Backup Codes**: Recovery options for 2FA

### 🛡️ **Application Security**
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **DDoS Protection**: Automatic IP banning for abuse
- **Input Validation**: All user inputs sanitized and validated
- **XSS Prevention**: Content Security Policy + DOMPurify
- **CSRF Protection**: Built-in Next.js protection
- **Security Headers**: HSTS, X-Frame-Options, CSP, etc.

### 📊 **Security Monitoring**
- **Real-time Logging**: All security events tracked
- **Threat Detection**: Automated suspicious activity detection
- **Brute Force Protection**: Account lockout mechanisms
- **Security Statistics**: Comprehensive security metrics

## 📊 **Performance & Analytics**

### ⚡ **Performance Optimization**
- **Bundle Optimization**: Next.js automatic optimization
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: YouTube videos and components
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Browser caching and CDN-ready

### 📈 **Analytics Ready**
- **User Progress Tracking**: Built-in progress statistics
- **Problem Analytics**: Views, completion rates
- **Security Analytics**: Threat detection metrics
- **Performance Monitoring**: Ready for external monitoring

## 🔧 **Configuration**

### 🔥 **Firebase Configuration**

1. **Authentication**
   ```javascript
   // Enable in Firebase Console:
   // - Email/Password authentication
   // - Email verification (optional)
   ```

2. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // See firestore.rules for complete rules
     }
   }
   ```

3. **Storage (if needed)**
   ```javascript
   // Configure for file uploads if extending the platform
   ```

### 🔒 **Security Configuration**

1. **Environment Variables**
   - Store all sensitive data in `.env.local`
   - Never commit API keys to version control
   - Use different configs for dev/staging/production

2. **CSP Configuration**
   ```javascript
   // Located in middleware.ts
   // Customize CSP rules as needed
   ```

## 🚀 **Deployment**

### 🌐 **Recommended Platforms**

1. **Vercel** (Recommended)
   ```bash
   # Connect GitHub repo to Vercel
   # Set environment variables in dashboard
   # Deploy automatically on push
   ```

2. **Netlify**
   ```bash
   # Build command: npm run build
   # Publish directory: .next
   # Set environment variables in dashboard
   ```

3. **Self-hosted**
   ```bash
   npm run build
   npm start
   ```

### ✅ **Production Checklist**

- [ ] Environment variables configured
- [ ] Firebase security rules deployed
- [ ] Database seeded with problems
- [ ] SSL certificate configured
- [ ] Security headers enabled
- [ ] Performance monitoring set up
- [ ] Backup strategy implemented
- [ ] Domain configured
- [ ] CDN configured (optional)

## 📱 **Mobile Responsiveness**

- **📱 Mobile-First Design** - Optimized for mobile devices
- **💻 Desktop Enhanced** - Rich experience on larger screens
- **📊 Responsive Tables** - Problems table adapts to screen size
- **🎬 Mobile Video Player** - YouTube integration works on all devices
- **⌨️ Touch Optimized** - Button sizes and interactions optimized

## 🎨 **Customization**

### 🎨 **Theming**
```javascript
// Customize colors in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FFA116',
        'dark-layer-1': '#262626',
        // Add your custom colors
      }
    }
  }
}
```

### 📝 **Adding Problems**
1. Add problem to `src/mockProblems/problems.ts`
2. Run seeding process via `/admin/seed`
3. Create problem page in `src/pages/problems/[pid].tsx`

### 🎬 **Adding YouTube Videos**
1. Update problem with `videoId` in mock data
2. Re-seed database
3. Videos automatically appear with red YouTube icons

## 🔍 **Troubleshooting**

### ❌ **Common Issues**

1. **Auth not working**
   - Check Firebase configuration
   - Verify environment variables
   - Check browser console for errors

2. **Problems not loading**
   - Run database seeding at `/admin/seed`
   - Check Firestore security rules
   - Verify Firestore connection

3. **YouTube videos not showing**
   - Ensure problems have `videoId` field
   - Check if seeding completed successfully
   - Verify react-youtube package installed

4. **Build errors**
   - Run `npm install` to ensure all dependencies
   - Check TypeScript errors with `npm run type-check`
   - Verify environment variables are set

### 🐛 **Debug Mode**
```javascript
// Enable in browser console
localStorage.setItem('debug', 'true');
// Check console for detailed logging
```

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### 📝 **Contribution Guidelines**
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Follow existing code style
- Test security features thoroughly

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team** - Amazing React framework
- **Firebase Team** - Excellent backend services
- **Tailwind CSS** - Utility-first CSS framework
- **React Community** - Ecosystem and components
- **Security Community** - Best practices and guidelines

## 📞 **Support**

- 📧 **Email**: Create an issue for support
- 💬 **Discussions**: Use GitHub Discussions
- 🐛 **Bug Reports**: Open GitHub Issues
- 📚 **Documentation**: Check this README and code comments

---

## 🏆 **Features Summary**

✅ **15 Curated Problems** (Algorithm + DevOps + Database)  
✅ **YouTube Integration** (Video solutions for every problem)  
✅ **Enterprise Security** (2FA, DDoS protection, monitoring)  
✅ **Modern UI/UX** (Responsive, dark theme, smooth animations)  
✅ **Firebase Backend** (Authentication, Firestore, real-time)  
✅ **TypeScript** (Type safety and better development)  
✅ **Production Ready** (Optimized, secure, scalable)  
✅ **Mobile Responsive** (Perfect on all devices)  
✅ **SEO Optimized** (Next.js SSR and meta tags)  
✅ **Security Grade A+** (Bank-level security implementation)  

**CodeMaster - Where coding excellence meets enterprise security! 🚀**
