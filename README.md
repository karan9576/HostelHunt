# Hostel Hunt

## Project Overview
Hostel Hunt is a full-stack web application designed to connect college students seeking nearby hostels or PG accommodations with property owners looking to list their accommodations. The application features a user-friendly interface, secure authentication, interactive maps, and reliable deployment, providing an efficient solution for finding and booking hostels.

## Technologies Used
- **Front-End:** HTML, CSS, JavaScript, EJS
- **Back-End:** Node.js, Express.js
- **Database:** MongoDB
- **Security:** Passport.js for authentication and authorization
- **Mapping:** Mapbox for interactive maps
- **Architecture:** MVC (Model-View-Controller)
- **Deployment:** MongoDB Atlas and Render
- **Additional Tools:** RESTful APIs, Custom Error Handling, Data Validation

## Key Features
- **Responsive UI:** Designed with HTML, CSS, and JavaScript to ensure an intuitive and responsive user experience.
- **RESTful APIs:** Implemented for efficient communication between front-end and back-end.
- **MongoDB Integration:** Used for storing and managing user data and hostel information.
- **Node.js and Express.js:** Configured to create a robust back-end server.
- **Secure Authentication:** Applied using Passport.js to manage user sessions and access control.
- **Custom Error Handling:** Developed middleware to manage and display meaningful error messages.
- **Data Validation:** Added for both front-end forms and back-end data processing.
- **MVC Architecture:** Structured application promoting organized code and separation of concerns.
- **Interactive Maps:** Integrated using Mapbox for visual context and easy navigation.
- **Deployment:** Utilized MongoDB Atlas for database hosting and Render for server hosting.

## Installation and Setup
1. **Clone the repository:**
    ```bash
    git clone https://github.com/karan9576/HostelHunt.git
    cd HostelHunt
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      ```env
      CLOUD_NAME=your_cloudinary_name
      CLOUD_API_KEY=your_cloudinary_api_key
      CLOUD_API_SECRET=your_cloudinary_api_secret
      MAP_TOKEN=your_mapbox_token
      ATLASDB_URL=your_mongodb_atlas_url
      SECRET=your_session_secret
      ```

4. **Run the application:**
    ```bash
    nodemon app.js
    ```

## Usage
- **Home Page:** Browse available hostels and PG accommodations.
- **Sign Up/Login:** Create an account or log in using existing credentials.
- **Search:** Use the search functionality to find hostels based on location.
- **Interactive Maps:** View hostel locations on an interactive map powered by Mapbox.
- **Booking:** Book a hostel directly through the application.

## Project Structure
- **controllers/**: Contains application logic and route handlers.
- **init/**: Contains initialization scripts and configuration files.
- **models/**: Contains Mongoose models for data representation.
- **public/**: Stores static assets like CSS, JavaScript, and images.
- **routes/**: Defines application routes.
- **utils/**: Contains utility functions and helper modules.
- **views/**: Contains EJS templates for rendering web pages.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Project documentation file.
- **app.js**: Entry point of the application.
- **cloudconfig.js**: Configuration file for cloud services.
- **middleware.js**: Custom middleware for error handling and authentication.
- **package-lock.json**: Automatically generated file for locking the dependencies versions.
- **package.json**: Contains metadata about the project and its dependencies.
- **schema.js**: Schema definitions for the database.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Mapbox](https://www.mapbox.com/)

## Contact
For any inquiries or issues, please contact Karan Kumar at [yourname](mailto:youremail@example.com).

---

Thank you for using Hostel Hunt! We hope this application makes your search for hostels and PG accommodations easier and more efficient.

[Visit Hostel Hunt](http://hostelhunt.onrender.com/listings)
