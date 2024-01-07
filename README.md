# Full Stack Blog Application

This project is a full-stack blog application built with Node.js, Express.js, MongoDB for the backend, React for the frontend, and Material-UI for styling.

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB

- **Frontend**:
  - React
  - Material-UI for styling

## Project Organization

The project can be divided into two parts: frontend and backend.

### Backend

This backend system is designed using Node.js and Express, offering a set of RESTful APIs to handle blog post data. MongoDB serves as the database

1. **Running the Backend:**

   - Navigate to the `backend` folder using:
     ```
     cd backend
     ```
   - Install npm packages:
     ```
     npm install
     ```
   - Start the backend server:
     ```
     nodemon index.js
     ```

### Frontend

After running backend, frontend can be started.

2. **Running the Frontend:**

   - Navigate to the `frontend` folder using:

     ```
     cd frontend

     ```

   - Install required npm packages:

     ```
     npm install

     ```

   - Start the frontend:
     ```
     npm start
     ```

## Features

- **User Authentication**: Users can register and log in to the application. After successful registration, a JWT token is generated and sent to the authenticated user, granting access to create, edit, and delete blog posts.
- **View Blog Posts**: Users, whether logged in or not, can view all the blog posts available on the homepage. Each blog post displays its title, corresponding picture, author, posting time, and a short description.
- **Read Full Blog Post**: Clicking on a blog post redirects the user to a new page displaying the full content of the blog post.
- **Edit and Delete Posts**: Only logged-in users have the ability to edit or delete their blog posts from the individual post page.
- **Change Theme**: Users have the option to switch between light and dark themes for better readability.
- **Password Security**: User passwords are securely hashed and stored in the MongoDB database.
