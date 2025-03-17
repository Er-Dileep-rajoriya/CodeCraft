# Chatbot Application for Landing Page Generation

## Overview

This project is a **Chatbot Application** that generates well-structured **HTML** and **CSS** code for landing pages. It provides a live preview of the generated code and allows users to download the HTML file. The application is built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **NextAuth.js** for authentication. It integrates a **GenAI API** (e.g., OpenAI or Google Gemini) to power the chatbot.

The application supports **light and dark themes**, **manual login/signup**, and **social logins** (Google and GitHub). All pages are fully responsive, ensuring a seamless experience across devices.

### Authentication System
    Live Deploy Link


## Features

### Authentication System
- **Manual Login/Signup**: Users can create an account and log in using an email and password.
- **Social Logins**: Users can log in using their Google or GitHub accounts.
- **Secure Authentication**: Built using **NextAuth.js** for secure and scalable authentication.

### Chat Interface
- Users can input prompts to generate **HTML** and **CSS** code.
- The chatbot is powered by a **GenAI API** (e.g., OpenAI or Google Gemini).

### HTML & CSS Code Generation
- The chatbot generates well-structured **HTML** and **CSS** code based on user prompts.
- The generated code is displayed in a chat-like interface.

### Live Preview
- Users can view a live preview of the generated code in a modal.
- The preview is rendered in an **iframe** for real-time visualization.

### Download Generated Code
- Users can download the generated **HTML** file with a single click.

### Light and Dark Themes
- The application supports **light** and **dark** themes for an enhanced user experience.
- The theme can be toggled manually or automatically based on system preferences.

### Responsive Design
- All pages are fully responsive, ensuring a seamless experience on **mobile**, **tablet**, and **desktop** devices.

### System Prompt Optimization
- The chatbot is fine-tuned to generate **responsive** and **modern** landing pages.
- The generated code uses **internal CSS** only (no external CSS).

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadcnUI](https://ui.shadcn.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) ([Supabase](https://supabase.com/)
- **GenAI API**: [Google Gemini](https://gemini.google.com/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **PostgreSQL database**: Via Supabase or NeonDB
- **API Key**: For the GenAI provider (e.g., OpenAI or Google Gemini)

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Install Dependencies:**
    -> npm install

3. **Set Up Environment Variables**
Create a .env file in the root directory and add the following:

    DATABASE_URL=your_postgresql_database_url
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    OPENAI_API_KEY=your_openai_api_key
    Run the Development Server:


npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


4. **Project Structure**:

src/
├── app/
│   ├── (auth)/         # Authentication pages
│   ├── (home)/         # Home page and chat interface
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # Reusable components
├── redux/              # Redux store and slices
├── styles/             # Custom styles
├── utils/              # Utility functions
└── open_ai/            # GenAI API integration




5. **Authentication System**
    ->Manual Login/Signup: Email and password-based authentication.
    ->Social Logins: Google and GitHub integration.
    ->NextAuth.js: Secure and scalable user management.

6. **Light and Dark Themes**
    ->Supports light and dark themes.
    ->Toggle manually or sync with system preferences.
    ->Implemented using Tailwind CSS.

7. **Responsive Design**
    ->Fully responsive across mobile, tablet, and desktop.
    ->Built with Tailwind CSS for layout and styling.

8. **Bonus Features**
    ->Predefined Templates
    ->The chatbot provides predefined templates for common landing page structures (e.g., hero ->section, features section, footer).
    ->System Prompt Optimization
    ->Fine-tuned to generate responsive and modern landing pages.
    ->Ensures internal CSS only (no external CSS).