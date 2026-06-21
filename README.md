
A modern, role-based **Complaint & Issue Management System** developed for university use. It streamlines the process of submitting, tracking, and resolving student and staff complaints.

## ✨ Live Demo
https://issue-tracker-xi-jade.vercel.app/

## 🎯 Features

### **Core Functionality**
- **Role-Based Access Control** (Student, Faculty Member, HOD, DSA, Supervisor)
- **Complaint Submission** with attachments, priority, and category selection
- **Smart Routing** based on complaint category and department
- **Real-time Status Tracking** with timeline visualization
- **AI-Powered Suggestions** (integrated with Botpress)
- **Notifications & Activity Logs**
- **Feedback & Rating** system after resolution

### **User Roles & Permissions**
| Role            | Key Capabilities                          |
|-----------------|-------------------------------------------|
| **Student**     | Submit complaints, track own issues       |
| **Faculty**     | Handle assigned complaints                |
| **HOD**         | Department-level oversight & resolution   |
| **DSA**         | Administrative & facility complaints      |
| **Supervisor**  | High-level System handling                |

### **Technical Highlights**
- Secure file uploads (Supabase Storage)
- Responsive, modern UI with Framer Motion animations
- Comprehensive audit logging
- Email notifications (configurable)
- Clean, maintainable component architecture

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Lucide React icons, Recharts (analytics)
- **Animations**: Framer Motion
- **Other**: bcryptjs, date-fns, Botpress AI Chatbot

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- (Optional) Gmail account for email notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/efafatima/Issue-Tracker.git
   cd Issue-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase credentials and other settings.

4. **Database Setup**
   - Go to your Supabase project → SQL Editor
   - Run the scripts from `supabase/schema.sql` and `supabase/storage.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages & API routes
├── components/          # Reusable UI components
├── lib/                 # Utilities, Supabase client, design tokens
supabase/
├── schema.sql           # Database schema & policies
├── storage.sql          # Storage configuration
public/                  # Static assets
```

## 🔧 Key Components

- `StatusBadge` – Visual status indicators
- `RoleBadge` – Role-specific colored badges
- `IssueTimeline` – Progress visualization
- `AIPanel` – AI suggestions panel

See `COMPONENT_USAGE_GUIDE.md` for detailed usage.

## 🎨 Design Philosophy

- University-themed color palette (Navy Blue, Professional accents)
- Clear visual hierarchy for different user roles
- Mobile-first responsive design
- Accessibility focused

## 📋 Future Enhancements

- Advanced analytics dashboard
- Push notifications
- Document versioning for complaints
- Calendar integration for deadlines
- Bulk actions for admins

## 👥 Contributors

- **Efa Fatima** – Full Stack Developer

## 📄 License

This project is developed as part of a university Final Year Project (FYP). All rights reserved.

---

**Made with ❤️ for better university grievance redressal**
```

