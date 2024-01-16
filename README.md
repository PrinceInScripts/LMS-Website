<H1 align ="center" > About Learning Management System (LMS) projec  </h1>
<br/>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd client
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```

In the second terminal

- cd backend and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---

NODE_ENV = development
PORT =5000
FRONTEND_URL =http://localhost:3000
MONGO_URL =
JWT_SECRET =
JWT_EXPIRY = 60m

CONTACT_US_EMAIL

#cloundinary
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 

# Nodemailer
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 
SMTP_USERNAME = 
SMTP_PASSWORD = 
SMTP_FROM_EMAIL =

# Razorpay
RAZORPAY_KEY_ID = 
RAZORPAY_SECRET = 
RAZORPAY_PLAN_ID = 


```


```
# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```

##  Key Features

- User registration and login
- Authentication using JWT Tokens
- Redux Toolkit: State management for an intuitive and responsive user interface.
- Tailwind CSS Line Clamp: Effortless text truncation for a clean and modern design.
- Axios: Efficient HTTP client for smooth asynchronous data handling.
- Upload user ımages and story ımages  to the server
- Chart.js: Integrated charting capabilities for insightful data visualization.
- Cloudinary: Streamlined media management for images and videos.
- React-Router-Dom: Smooth navigation within the single-page application.
- Responsive Design

<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks  ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Css](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [CK-Editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Rich Text Editor 
- [React icons](https://react-icons.github.io/react-icons/) -
 Small library that helps you add icons  to your react apps.

####  Backend 

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers 
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [Nodemailer](https://nodemailer.com/about/) - Send e-mails from Node.js
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [multer](https://www.npmjs.com/package/multer) - Node.js middleware for uploading files 
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware


####  Database 

 - [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.


 ##  Screenshots 

 
![1](https://github.com/PrinceInScripts/Blog-App/assets/124567410/263acb64-2e47-42df-8c5e-1c061828144b)
![2](https://github.com/PrinceInScripts/Blog-App/assets/124567410/c9efd642-dbb0-49da-bc1e-87f747661d1f)
![3](https://github.com/PrinceInScripts/Blog-App/assets/124567410/fe61ed64-c4bf-43fd-962b-3fe224bb04ab)
![4](https://github.com/PrinceInScripts/Blog-App/assets/124567410/81262e44-f13b-4932-8a31-ddbfe5ce8b28)
![5](https://github.com/PrinceInScripts/Blog-App/assets/124567410/f3066d5e-fc2d-434e-a3d2-56083c3cea5a)
![6](https://github.com/PrinceInScripts/Blog-App/assets/124567410/27807e72-6cd3-4086-b9c1-5db9513d754a)
![7](https://github.com/PrinceInScripts/Blog-App/assets/124567410/aad8ad74-a821-4cf0-9e10-53672af900e6)
![8](https://github.com/PrinceInScripts/Blog-App/assets/124567410/557c82ca-18a2-409d-a9db-abb3b56792b0)
![9](https://github.com/PrinceInScripts/Blog-App/assets/124567410/9965a2b4-e02b-42ee-af5c-862b25b32ca7)
![10](https://github.com/PrinceInScripts/Blog-App/assets/124567410/315ea8d1-a93d-4822-a31c-ec16dd11bff3)
![11](https://github.com/PrinceInScripts/Blog-App/assets/124567410/f63184f3-04eb-4827-b949-3791c3d655db)
![12](https://github.com/PrinceInScripts/Blog-App/assets/124567410/208e4744-035e-4322-be2e-35bd5e924208)
![13](https://github.com/PrinceInScripts/Blog-App/assets/124567410/9687a595-cfd1-49d8-a622-2420e5fbc247)
![14](https://github.com/PrinceInScripts/Blog-App/assets/124567410/f04ebfd3-91c1-4e18-9dac-f878747e8720)
![15](https://github.com/PrinceInScripts/Blog-App/assets/124567410/0d9f798f-94bb-4dba-9529-3f6aaedd50f9)
![16](https://github.com/PrinceInScripts/Blog-App/assets/124567410/5f44173b-d261-4c30-a16b-50fd3b12f751)
![17](https://github.com/PrinceInScripts/Blog-App/assets/124567410/d128ff59-ebbc-49b6-b282-76c26de5b621)
![18](https://github.com/PrinceInScripts/Blog-App/assets/124567410/823e4e0e-2ecd-4153-958a-6bde583fe90f)
![19](https://github.com/PrinceInScripts/Blog-App/assets/124567410/aa344acc-c1e9-4569-b86f-72a1a9749ffa)
![20](https://github.com/PrinceInScripts/Blog-App/assets/124567410/8b308448-c9f7-4c70-8592-ab1291d91f34)
![21](https://github.com/PrinceInScripts/Blog-App/assets/124567410/c019ad37-768e-4bcf-a57a-109ef51d348c)
![22](https://github.com/PrinceInScripts/Blog-App/assets/124567410/a2c84d65-025e-44e3-86eb-076cf7bbb124)

 
