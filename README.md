# Frontend Setup for agreeD

## Overview
This guide outlines the steps to set up the frontend for **agreeD**, a platform designed to revolutionize contract management by combining AI-powered automation with human decision-making. The frontend is built with modern web development tools to ensure a seamless user experience.

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
