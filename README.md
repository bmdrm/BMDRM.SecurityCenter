# BMDRM Security Center

A modern, responsive security dashboard built with Next.js 15 and TypeScript, inspired by CrowdSec's interface design.

## 🚀 Features

### 📊 Dashboard

- **Real-time Statistics**: Total alerts, active decisions, blocked IPs, and success rate
- **Recent Alerts**: Quick overview of latest security events with severity indicators
- **Quick Actions**: Direct navigation to alerts and decisions management

### 🚨 Alerts Management

- **Advanced Filtering**: Search by type, source, or description
- **Severity & Status Filters**: Filter by Critical, High, Medium, Low severity levels
- **Bulk Operations**: Select multiple alerts for batch actions
- **Interactive Table**: Sortable columns with detailed alert information
- **Real-time Data**: Comprehensive mock data showing various attack types

### ⚖️ Decisions Management

- **Decision Tracking**: View and manage active security decisions
- **Type-based Filtering**: Ban, Captcha, and Throttle decisions
- **Status Management**: Active, Expired, Revoked, and Pending statuses
- **Bulk Operations**: Select and manage multiple decisions
- **Detailed Information**: IP addresses, countries, ASN data, and timestamps

### ⚙️ Settings & Configuration

- **Notification Preferences**: Email, SMS, and push notification settings
- **Security Configuration**: Two-factor authentication, session timeout, IP whitelisting
- **User Profile**: Account management and personal information
- **API Key Management**: Generate and manage API keys
- **System Information**: Version, uptime, and operational status

## 🛠 Technical Stack

- **Next.js 15**: Latest version with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom components
- **Heroicons**: Beautiful SVG icons
- **Date-fns**: Date formatting and manipulation
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

- **Dashboard** (`/`) - Main overview with statistics and recent activity
- **Alerts** (`/alerts`) - Security event management
- **Decisions** (`/decisions`) - Active security decisions
- **Settings** (`/settings`) - Configuration and preferences

## 🎨 Design Features

- **CrowdSec-Inspired UI**: Clean, professional interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modern Components**: Consistent iconography and styling
- **Color-coded Status**: Visual indicators for severity and status
- **Interactive Elements**: Hover effects and smooth transitions

## 📊 Mock Data

The application includes realistic mock data demonstrating:

- Various attack types (Brute Force, DDoS, SQL Injection, etc.)
- Different severity levels and statuses
- Geographic and ASN information
- Realistic timestamps and descriptions

## 🔧 Development

The project uses modern development practices:

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture
- Responsive design principles

## 📝 License

This project is part of the BMDRM Security Center initiative.
