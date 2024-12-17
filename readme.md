# Paggo Smart OCR
# Paggo Smart OCR

## Description

**Paggo Smart OCR** is a web application that allows users to upload images and documents, process them using OCR (Optical Character Recognition) to extract text, and manage the uploaded files. The solution consists of two main services:

- **Frontend**: Developed with **Next.js** and **Tailwind CSS**, enabling user interaction with the application.
- **Backend**: Built with **NestJS**, **Prisma ORM**, and **PostgreSQL** to handle data and database integration.

## Features

- **User Registration**: Allows new users to register on the platform.
- **Login**: Login functionality for accessing the application’s features.
- **File Upload**: Users can upload documents and images.
- **OCR Processing**: Text extraction from uploaded images.
- **Image and Document Management**: Users can view and manage their uploaded files.

## Technologies Used

- **Frontend**:
  - **Next.js** (React.js)
  - **TypeScript**
  - **Tailwind CSS**
  - **Axios** for HTTP requests
  
- **Backend**:
  - **NestJS**
  - **TypeScript**
  - **Prisma ORM** (Database: **PostgreSQL**)
  - **JWT** (JSON Web Token) for authentication
  
- **OCR**: 
  - Integration with an OCR service for text extraction from images.

## How to Run Locally

### Backend

1. **Clone the repository:**
  ```bash
   git clone <https://github.com/evelisedias/paggo-smart-ocr.git>
   cd backend

2. **Install dependencies:**

  ```bash
    npm install


3. **Configure the database:**
  ```bash
    Set up a local or cloud PostgreSQL database.
    Configure the .env file with your database credentials. Example:
 
4. ** Run the migrations:**

  ```bash
    npx prisma migrate dev

5. **Start the server:**

   ```bash
    npm run start



### Frontend

1. **Clone the repository:**

   ```bash
    git clone <frontend_repository_link>
    cd frontend

2. **Install dependencies:**

   ```bash
    npm install
    
3. **Start the server:**

   ```bash
    npm run dev


Access the application in your browser at http://localhost:3000.


This project follows best development practices with a focus on delivering functional solutions. While not all features may be fully implemented, attention has been given to the most essential aspects to ensure a solid foundation. The system is designed to be scalable and easy to maintain.

If you have any questions or suggestions, feel free to open an issue in the repository. We're always happy to improve and learn together!

This README includes essential details about the project, how to set it up locally, and links to the source repositories for both the frontend and backend.





