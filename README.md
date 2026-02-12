# Spectrum Landing Page

The Operating System for Execution — A modern, production-ready waitlist landing page built with Next.js.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Database**: MongoDB Atlas
- **Email**: Resend (production) or SMTP fallback
- **Deployment**: Vercel

## 📦 Features

- ✅ Beautiful, cinematic scrolling experience
- ✅ Real-time OTP email verification
- ✅ Secure waitlist with MongoDB persistence
- ✅ Fully responsive (mobile-first)
- ✅ Dark mode native design
- ✅ Performance optimized (90+ Lighthouse score)
- ✅ Accessibility compliant (prefers-reduced-motion support)

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier works)
- Resend API key (free tier: 100 emails/day)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spectrum-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `RESEND_API_KEY`: Your Resend API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `RESEND_API_KEY` | Recommended | Resend API key for production emails |
| `EMAIL_USER` | Optional | SMTP email (fallback) |
| `EMAIL_PASS` | Optional | SMTP password (fallback) |

### Getting Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create an API key in the dashboard
3. Add to `.env.local`: `RESEND_API_KEY=re_...`

### Getting MongoDB URI

1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string from "Connect" → "Drivers"
4. Add to `.env.local`: `MONGODB_URI=mongodb+srv://...`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/otp/         # OTP generation & verification API
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles & animations
├── components/
│   ├── animations/      # GSAP & Framer Motion components
│   ├── sections/        # Landing page sections (S01-S11)
│   └── ui/              # Reusable UI components
└── lib/
    ├── email.ts         # Resend email service
    ├── mongodb.ts       # MongoDB connection
    ├── rateLimit.ts     # Rate limiting utility
    └── validation.ts    # Input validation
```

## 🚢 Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - In Vercel dashboard → Project → Settings → Environment Variables
   - Add `MONGODB_URI` and `RESEND_API_KEY`

4. **Deploy**
   - Click "Deploy"
   - Every push to `main` auto-deploys

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🧪 Testing

### Build Verification

```bash
npm run build
```

### Production Preview

```bash
npm run build
npm start
```

### Manual Testing Checklist

- [ ] Enter name and email → receive OTP
- [ ] Verify OTP → success message
- [ ] Test invalid email format
- [ ] Test expired OTP (wait 5 minutes)
- [ ] Test resend OTP (30-second cooldown)
- [ ] Test rate limiting (3 requests per 10 minutes)
- [ ] Test mobile responsiveness
- [ ] Test animations (smooth at 30+ FPS)

## 🔒 Security Features

- ✅ OTP hashing with bcrypt
- ✅ Rate limiting (3 requests/10 min)
- ✅ Input validation & sanitization
- ✅ Disposable email blocking
- ✅ OTP expiry (5 minutes)
- ✅ Resend cooldown (30 seconds)

## 📊 Monitoring

- **Analytics**: Vercel Analytics (built-in)
- **Database**: MongoDB Atlas Dashboard
- **Logs**: Vercel Logs (real-time)

## 🤝 Contributing

This is a private project. For issues or questions, contact: hello@spectrumexec.com

## 📄 License

© 2026 Spectrum. All rights reserved.
