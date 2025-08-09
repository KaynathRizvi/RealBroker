# 🏡 Full-Stack Real Estate Application

Welcome to the **Full-Stack Real Estate Application**! This repository hosts a complete real estate management system with three interconnected parts:

- 📱 **Client:** A cross-platform mobile app built with **Expo React Native**  
- 🖥️ **Server:** A RESTful API backend powered by **Node.js** & **Express.js**  
- 🛠️ **Admin:** A React.js + Vite admin dashboard for managing users and properties  

The app leverages **PostgreSQL** as the database and is hosted on **Render.com** for scalable cloud deployment.

---

## 🗂️ Project Structure

```

/client    # Expo React Native mobile app source code
/server    # Node.js + Express.js backend API source code
/admin     # React.js + Vite admin dashboard source code

````

---

## 🚀 Technologies Used

### 📱 Client (Mobile App)
- Built with **Expo React Native** — supports both iOS and Android  
- User-friendly UI for browsing and interacting with properties  
- Start development server with:

```bash
npx expo start
````

---

### 🖥️ Server (Backend API)

* RESTful API built on **Node.js** and **Express.js**
* Handles authentication, property data, and routing
* Uses **PostgreSQL** for data persistence
* Run the server locally with:

```bash
node index.js
```

> **Note:** Ensure your environment variables (like DB credentials) are properly configured before starting the server.

---

### 🛠️ Admin (Dashboard)

* Built using **React.js** with **Vite** for a fast developer experience
* Admin interface for managing users and properties (CRUD operations)
* Start the admin dashboard locally with:

```bash
npm run dev
```

---

## ☁️ Hosting

The backend API, admin dashboard, and client app are hosted on **Render.com** — providing reliable, scalable, and performant deployment.

---

## 🏁 Getting Started

### Prerequisites

* Node.js & npm/yarn installed
* PostgreSQL database set up
* Environment variables configured for the server (`.env` file)

### Running Locally

1. **Server**

```bash
cd server
npm install
node index.js
```

2. **Client**

```bash
cd client
npm install
npx expo start
```

3. **Admin**

```bash
cd admin
npm install
npm run dev
```

---

## ✨ Features

* 🔐 User registration, login, and profile management
* 🏘️ Property listings with detailed info and image galleries
* 🛡️ Admin dashboard with user/property management
* 📱 Responsive design for mobile and desktop
* 🚀 Smooth navigation & seamless user experience
* 🔒 Secure backend API integrated with PostgreSQL

---

## 📁 Folder Overview

| Folder    | Description                                    |
| --------- | ---------------------------------------------- |
| `/client` | React Native Expo app for mobile platforms     |
| `/server` | Node.js + Express backend with PostgreSQL      |
| `/admin`  | React.js + Vite admin dashboard for management |

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing & Support

Issues and pull requests are welcome! Feel free to open an issue for any bug or feature request.

---

## 📬 Contact

For questions or feedback, please open an issue or contact the repo owner.

---

Thank you for checking out this project! 🙌

