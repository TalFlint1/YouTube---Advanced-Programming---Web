# YouTube Web Application - Advanced Programming

## Overview

This project involves creating a web application inspired by YouTube using JavaScript, CSS, React, Node.js, Express, and MongoDB. The application includes registration, login, video listing, video viewing, and adding new videos functionalities. Additionally, it features a server exposing a RESTful API with data stored in a MongoDB database.

## Features

- *Registration Screen*: Sign up with a username, password, display name, and a profile picture.
- *Login Screen*: Log in using username and password.
- *Video List Screen*: Display a list of videos (similar to YouTube's homepage).
- *Video View Screen*: Play the selected video.
- *Add New Video Screen*: Allows users to add new videos.
- *Dark/Light Mode Toggle*: Switch between dark and light themes.

## API Endpoints

### Videos
- GET /api/videos
  - Returns a list of 20 videos, including the 10 most viewed and 10 randomly selected videos, all displayed in a random order.
- GET /api/videos/all
  - Returns a list of all videos in db.
- GET /api/users/:id/videos
  - Returns the list of videos for the user with the identifier id.
- POST /api/users/:id/videos
  - Creates a new video post.
- GET /api/users/:id/videos/:pid
  - Returns the details of the video with the identifier pid.
- PUT /api/users/:id/videos/:pid
  - Updates an existing video post with the identifier pid.
- DELETE /api/users/:id/videos/:pid
  - Deletes an existing video post with the identifier pid.
  
### Users
- GET /api/users/:id
  - Returns the details of the user with the identifier id (name, picture, etc.).
- PATCH/PUT /api/users/:id
  - Updates an existing user with the identifier id.
- DELETE /api/users/:id
  - Deletes an existing user with the identifier id.
- POST /api/users
  - Creates a new user.
- POST /api/tokens
  - Generates a JWT for a registered user.

## Running the Code

### Clone the Repository

1. Open your terminal in Visual Studio (or any other IDE). Move to the desired directory in which you want to clone the project using the cd command, then write:
2.  git clone https://github.com/TalFlint1/YouTube---Advanced-Programming---Web.git
3.  the branch is main_ex2 so check you are on this branch where you run the app
4. run the script populateDB.js in server folder to set data and tables of mongoDB database.
5. run the server by cmd:
cd server
node server.js
6. run the client by cmd:
npm start
   
