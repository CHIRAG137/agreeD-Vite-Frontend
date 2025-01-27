# Frontend Setup for AgreeD

## Overview

This guide outlines the steps to set up the frontend for **AgreeD**, a platform designed to revolutionize contract management by combining AI-powered automation with human decision-making. The frontend is built with modern web development tools to ensure a seamless user experience.

---

## Features

**Personalized Email and Call Reminders**

Stay on top of important **agreement dates** and **tasks** with automated **email** and **call reminders**. Never miss a **deadline** or important task again—everything is taken care of automatically.

**Contract Signing**

Streamline the **contract signing** process by integrating automated **reminders** for **deadlines** and required **actions**. Sign **agreements** with confidence while the system handles the rest for you.

**Talk to Your Contract Expert**

Get instant answers to any **contract-related questions** through a real-time **video call assistant**. Whether it's about **clauses**, **deadlines**, or **obligations**, navigate your **agreements** with ease and clarity.

**Contract Bot**

Simplify **contract management** with a smart **text-based bot** that provides instant answers to your queries. Clarify **terms**, track **deadlines**, and stay informed about your **agreements** anytime, anywhere.

**Payment Gateway**

Manage **payments** effortlessly with a **secure payment gateway**. Enjoy smooth **transaction processing**, **real-time tracking**, and robust **security** for all your **financial needs**.

**Templates - Contract Management Made Easy**

Access a library of professionally crafted, customizable **contract templates**. From **business deals** to **personal agreements**, create and edit **contracts** quickly and easily with legally sound templates.

**Schedule in Calendar**

Automatically **schedule** important tasks and events in your **calendar**. With built-in **reminders**, you can stay organized and on top of all your **commitments** without the stress of remembering every detail.

---

## Prerequisites

1. **Node.js**: Ensure that Node.js is installed on your machine. [Download Node.js](https://nodejs.org/)
2. **npm or yarn**: Comes with Node.js; check by running `npm -v` or `yarn -v`.
3. **agreeD Frontend Repository**: Clone the agreeD frontend repository from your version control system.

---

## Environment Variables

Create a `.env` file in the root directory of the frontend project and add the following variable:

```env
VITE_HEYGEN_API_KEY=MjY0NzQ1NWE5Zjg1NGE4MmE1MjRiNzg1MmIyZTkxMzMtMTczNzgyNDEwNw==
```

- Replace the placeholder API key with your actual **Heygen API key** if different. Keep this file secure and do not expose it in public repositories.

---

## Setup Instructions

1. **Navigate to the Project Directory:**

   ```bash
   cd agreeD
   ```

2. **Install Dependencies:**
   Install all required dependencies using npm or yarn:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the Development Server:**
   To run the frontend in development mode, use:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. **Access the Application:**
   The development server will start, and you can access the application at [http://localhost:5173](http://localhost:5173) by default.

---

## Building for Production

To create an optimized build for production:

1. Run the build command:

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

2. The build artifacts will be generated in the `dist` folder.

3. Deploy the contents of the `dist` folder to your preferred hosting service (e.g., Vercel, Netlify, or AWS).

---

## Notes

- Ensure your `.env` file is correctly configured before running the application.
- Use modern browsers like Chrome, Firefox, or Edge for the best experience.
- If you encounter issues, check the console logs or reach out for support.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out for assistance or any queries!
