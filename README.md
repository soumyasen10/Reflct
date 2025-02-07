# Reflct - Journal Store WebApp ✨

Reflct is a beautifully designed journaling web application that allows users to store and manage their personal journals with fancy emojis and mood tracking. Built with modern web technologies, it provides a seamless and interactive experience for users who want to keep track of their thoughts and emotions.

## 🚀 Features
- 📖 **Journal Entries** - Store and manage your daily journal entries.
- 🎭 **Mood Tracking** - Track your mood with expressive emojis.
- 🎨 **Beautiful UI** - Styled with Tailwind CSS and ShadCN UI.
- ⚡ **Fast & Responsive** - Built with Next.js for a smooth experience.
- 🛡 **Validation & Forms** - Uses React Hook Form with Zod for robust validation.
- 🗄 **Database** - Powered by NeonDB (PostgreSQL) with Prisma ORM.

## 🛠 Tech Stack
- **Framework:** Next.js
- **UI Components:** ShadCN UI
- **Styling:** Tailwind CSS
- **Database:** NeonDB (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Clerk
- **Forms & Validation:** React Hook Form & Zod
- **Rate limiting & Bot Protection** Arcjet

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/soumyasen10/Reflct.git
   cd reflct
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
3. **Set up environment variables:**
   ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=

    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

    DATABASE_URL=

    ARCJET_KEY=

    PIXABAY_API_KEY=
4. **Push Prisma schema to the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
5. **Start the development server:**
   ```bash
   npm run dev

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/6d3da407-7786-4755-ba7d-1f2a054d6125)
![image](https://github.com/user-attachments/assets/9dd3c283-d14d-4111-a3b5-e71c145fab0f)


## 📞 Contact
- **For any queries, reach out to [soumyasenofficial@gmail.com] or open an issue on GitHub.**

