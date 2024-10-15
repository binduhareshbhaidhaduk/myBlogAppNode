
# MyBlogApp

A simple blog application built with Node.js, Express, and MongoDB. Users can create, edit, and delete their blogs. The application also supports user authentication and profile management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- User authentication (Signup/Login/Logout)
- Add, edit, and delete blogs
- View all blogs and user-specific blogs
- Profile management with an option to upload images
- Responsive and modern UI



## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/binduhareshbhaidhaduk/node_blogs
    ```

2. Navigate into the project directory:

    ```bash
    cd node_blogs
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root of your project and adding the following:

    ```env
    PORT=4000
    MONGO_URI=binduhareshbhaidhaduk/node_mongo_blogs
    ```

5. Start the MongoDB server:

    ```bash
    mongoose
    ```

6. Run the application:

    ```bash
    npm start
    ```

The application should now be running on `http://localhost:4000`.

## Usage

- Visit the homepage to view all blogs.
- Sign up or log in to start creating your own blogs.
- Navigate to the profile page to view and manage your blogs.

## Folder Structure

```bash
MyBlogApp
├── config            # Configuration files (e.g., passport config)
├── controller        #  Controller functions for handling requests
├── model             # Mongoose models (User, Blog)
├── routes            # Express routes (authentication, blogs, profile)
├── views             # EJS templates (HTML views)
│   ├── partials      # Reusable partials (header, footer)
│   ├── layouts       # Layouts (base layout)
│   └── pages         # Page-specific templates (index, profile)
│   ├── css           # CSS files
├── .env              # Environment variables (Not included in version control)
├── .gitignore        # Git ignore file
├── index.js          # Entry point of the application
├── README.md         # Project documentation
└── package.json      # Project metadata and dependencies
```

## Technologies Used

- **Frontend:**
  - Bootstrap 5.3
  - EJS (Embedded JavaScript)
  - Custom CSS for styling
  - Bootstrap Icons

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB & Mongoose
  - Passport.js (Authentication)
  - Multer (File uploads)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.


