# Integrated Common Services to People - Education Domain

A comprehensive full-stack MERN application that integrates various services focused on the education domain. The project offers multiple user roles, advanced features for institutions and centers, and streamlined processes for teacher vacancies and student admissions, all governed by an admin approval system.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the required dependencies for both frontend and backend.

## Clone the repository
```bash
git clone https://github.com/RashmikaRamkumar/Integrated_Common_Services_to_People_EDUCATION.git
cd Integrated_Common_Services_to_People_EDUCATION
```

## Install frontend dependencies

```bash
cd frontend
npm install @react-pdf-viewer/core @react-pdf-viewer/default-layout axios js-cookie react react-dom react-hot-toast react-pdf react-router-dom react-toastify @types/react @types/react-dom @vitejs/plugin-react-swc eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh vite
```
## Install backend dependencies

```bash
cd ../backend
npm install axios bcrypt bcryptjs cloudinary cookie-parser cors crypto dotenv express express-fileupload gridfs-stream jsonwebtoken mongodb mongoose mongoose-validator multer multer-gridfs-storage nodemon react-pdf validator
```

## Usage

## Start the frontend server

```bash
cd frontend
npm run dev
```
## Start the backend server
```bash
cd backend
npm run dev
```
## Directory Structure
```plaintext
Integrated_Common_Services_to_People_EDUCATION/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── ...
└── backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── server.js
    ├── package.json
    └── ...
```
