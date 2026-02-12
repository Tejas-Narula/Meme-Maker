# MeMé Maker
**Developed By: Tejas Narula**

[![Watch the demo](https://github.com/user-attachments/assets/247bcfbc-60bd-44d6-8676-eee889132f74)](https://github.com/user-attachments/assets/eb167c98-f97a-4c5f-9f40-35da4d1e2675)


MeMé Maker is a high-performance web application built with React, designed to streamline the process of digital content creation(Meme Making). The platform provides a friendly interface for generating memes through a library of over 100+ templates, robust text customization, and client-side image rendering.

---

## Core Functionalities

* Choose from over 100 Meme Templates and create your own meme easily
* download the meme to share with the world
* Post the meme directly on the app

---

## Technical Specifications

| Component | Technology |
| :--- | :--- |
| **Framework** | React.js (Functional Components) |
| **Image Processing** | HTML5 Canvas API |
| **State Management** | React Hooks (useState, useRef, useEffect) |
| **Styling** | CSS3 / Modern Flexbox & Grid |
| **Environment** | Node.js Build Pipeline |

---

## Installation and Deployment

### System Requirements
* Node.js v16.x or higher
* npm v8.x or higher

### Local Implementation
1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/tejas-narula/meme-maker.git](https://github.com/tejas-narula/meme-maker.git)
    ```
2.  **Install Dependencies**
    ```bash
    cd meme-maker
    npm install
    ```
3. Go to the [Firebase Console](https://console.firebase.google.com).

- Create a new project (or use an existing one).

- Enable the required services:
  - Authentication
  - Firestore Database
  - Storage  
  *(Enable only what your project needs.)*

- Navigate to:

  **Project Settings → General → Your Apps → Web App → Firebase SDK configuration**

- Copy the Firebase configuration values:
  - `apiKey`
  - `authDomain`
  - `projectId`
  - `storageBucket`
  - `messagingSenderId`
  - `appId`

- Open your `.env` file and replace the placeholder values with your Firebase credentials.

#### Example `.env`

3.  **Launch Application**
    ```bash
    npm run dev
    ```


> **Project Status:** This project is actively maintained. For inquiries regarding contributions or feature requests, please contact Me

**Tejas Narula**
