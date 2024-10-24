# MyBlogApp

MyBlogApp is a simple blog application built with Node.js, Express, and MongoDB. Users can create, edit, and delete their blogs, manage topics and subtopics, and interact with comments through likes and dislikes. The application also supports user authentication and profile management, making it a comprehensive platform for bloggers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- **User Authentication**: Signup, Login, and Logout functionality.
- **Blog Management**: Add, edit, and delete blogs with rich text support.
- **Topic and Subtopic Management**: Create and manage topics and their subtopics.
- **Comment System**: View and comment on blogs, with options to like and dislike comments.
- **Profile Management**: Users can manage their profiles and upload images.
- **Responsive UI**: Modern and mobile-friendly interface.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/binduhareshbhaidhaduk/myBlogAppNode
    ```

2. **Navigate into the project directory**:

    ```bash
    cd MyBlogApp
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Set up environment variables** by creating a `.env` file in the root of your project and adding the following:

    ```env
    PORT=4000
    ```

5. **Start the MongoDB server**. Make sure MongoDB is installed and running. You can start it using:

    ```bash
    mongod
    ```

6. **Run the application**:

    ```bash
    npm start
    ```

The application should now be running on `http://localhost:4000`.

## Usage

- **Homepage**: Visit the homepage to view all blogs.
- **Authentication**: Sign up or log in to start creating your own blogs.
- **Blog Creation**: Click on the button to create a new blog post and fill in the necessary details.
- **Topic Management**: Manage topics and subtopics from your profile page.
- **Commenting**: Add comments to blogs and interact with other users via likes and dislikes.

## Folder Structure

```bash
MyBlogApp
├── config            # Configuration files (e.g., passport config)
├── controller        # Controller functions for handling requests
├── model             # Mongoose models (User, Blog, Topic, Subtopic)
├── routes            # Express routes (authentication, blogs, topics, comments)
├── views             # EJS templates (HTML views)
│   ├── partials      # Reusable partials (header, footer)
│   ├── layouts       # Layouts (base layout)
│   └── pages         # Page-specific templates (index, profile, topics, comments)
│   ├── css           # CSS files
├── .env              # Environment variables (Not included in version control)
├── .gitignore        # Git ignore file
├── index.js          # Entry point of the application
├── README.md         # Project documentation
└── package.json      # Project metadata and dependencies
