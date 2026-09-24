# 🏨 Vistora — Hotel & Property Listing Platform

Vistora is a full-stack web application for discovering, viewing, and managing hotel/property listings. The project is designed to provide a simple and user-friendly platform where users can explore properties, view detailed information, and share reviews and ratings.

The project focuses on implementing real-world **full-stack web development concepts**, including RESTful APIs, database relationships, CRUD operations, authentication, reviews, and server-side rendering.

---

## 🚀 Features

### 🏠 Property Listings

* Browse available hotel/property listings
* View property details including title, location, price, and description
* Create, edit, and delete listings
* Display property images and relevant information

## Screenshorts

## Home-Page

![Home-page](/assets/screenshorts/Home-Page.png)

## Property-Details

![Property-Details](/assets//screenshorts/Listing-Details.png)
## Property-Details-edit

![Property-edit](/assets/screenshorts/Edit-listing.png)

## Property-Review-And-Ratings

![Property-review](/assets/screenshorts/listing-comment-review.png)

## New-Property-Add

![Property-New-add](/assets/screenshorts/new-listing-add.png)

### ⭐ Reviews & Ratings

* Users can add reviews to properties
* Add ratings and comments
* Display reviews on property detail pages
* Delete reviews when permitted
* Review data is stored in MongoDB

### 🔐 Authentication & Authorization

* User registration and login
* Session-based authentication
* Protected routes for authorized actions
* Authorization checks for listing/review operations

### 🛠️ CRUD Operations

Vistora implements complete CRUD functionality:

* **Create** — Add new properties and reviews
* **Read** — View properties and reviews
* **Update** — Edit existing listings
* **Delete** — Remove listings and reviews

### 📱 Responsive Interface

* Clean and user-friendly interface
* Responsive layout for different screen sizes
* Property-focused UI for easy navigation

---

## 🧑‍💻 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Utilities

* Express-session
* Connect-Mongo
* Method-Override
* Joi
* Passport.js

### Development Tools

* Git
* GitHub
* VS Code
* Thunder Client

---

## 🏗️ Project Architecture

```text
Vistora
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── listings/
│   ├── reviews/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── utils/
│
├── app.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```


## 🔄 Application Flow

```text
User
 │
 ▼
Frontend / EJS Views
 │
 ▼
Express Routes
 │
 ▼
Controllers
 │
 ▼
Mongoose Models
 │
 ▼
MongoDB
 │
 ▼
Response
 │
 ▼
EJS View
```

---

## ⭐ Review System

The review functionality demonstrates a relationship between **Listings, Users, and Reviews**.

A review contains information such as:

```text
Review
├── Rating
├── Comment
├── Author
└── Listing
```

This allows each property to have multiple reviews while maintaining a connection between the review, the user, and the property.

---

## 🔒 Validation & Error Handling

The application includes validation and error-handling mechanisms to make the application more reliable.

* Request validation using Joi
* Mongoose validation
* Custom error handling
* Protected routes
* Authentication checks
* Authorization checks
* Handling invalid routes and requests

---

## 📸 Screenshots

### Home Page

Add your screenshot here:

```text
![Vistora Home Page](./screenshots/home.png)
```

### Property Details

```text
![Property Details](./screenshots/property-details.png)
```

### Reviews

```text
![Reviews](./screenshots/reviews.png)
```

### Login / Signup

```text
![Authentication](./screenshots/login.png)
```

> Replace the screenshot paths with the actual images in your repository.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vistora.git
```

### 2. Navigate to the Project

```bash
cd vistora
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

Do not commit your `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules/
```

### 5. Start the Application

```bash
npm start
```

or, if using nodemon:

```cmd
npm nodemon server.js
```

The application will run on your local server.

---

## 🧪 API / Backend Testing

Backend routes can be tested using tools such as **Thunder Client** or Postman.

Example operations:

```text
GET     /listings
POST    /listings
GET     /listings/:id
PUT     /listings/:id
DELETE  /listings/:id

POST    /listings/:id/reviews
DELETE  /listings/:id/reviews/:reviewId
```

---

## 🧠 Key Concepts Demonstrated

This project helped me implement and understand several real-world development concepts:

* RESTful routing
* MVC architecture
* CRUD operations
* MongoDB database design
* Mongoose schemas and relationships
* Referencing and population
* Authentication
* Authorization
* Session management
* Server-side rendering with EJS
* Middleware
* Form validation
* Error handling
* Flash messages
* HTTP methods
* Git & GitHub workflow

---

## 📚 What I Learned

While building Vistora, I gained practical experience in connecting the frontend, backend, and database into a complete web application.

The project helped me understand how:

1. Client requests reach Express routes.
2. Routes communicate with controllers.
3. Controllers interact with MongoDB through Mongoose.
4. Database results are passed back to the views.
5. Authentication and authorization protect application resources.
6. Reviews can be connected with users and listings through database relationships.

---

## 🔮 Future Improvements

Planned improvements for Vistora include:

* [ ] Search and filtering
* [ ] Advanced property categories
* [ ] Image upload using cloud storage
* [ ] Map/location integration
* [ ] User profile management
* [ ] Wishlist functionality
* [ ] Booking functionality
* [ ] Improved mobile UI
* [ ] REST API for frontend integration
* [ ] React-based frontend

---

## 👨‍💻 Developer

**Muhammad Uvais**

Frontend / Full-Stack Developer

* GitHub: https://github.com/uvais8958
* LinkedIn: https://www.linkedin.com/in/muhammad-u-253235250/

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
