# NomNoms App
NomNoms allows users to create recipes and modifications to foods based on their dietary choice.


### 1. Working Prototype (to do later)
(Example) You can access a working prototype of the React app here: https://nomnoms-app.vercel.app/ and Node app here: https://nomnoms-app.herokuapp.com/


### 2. User Stories
This app is for two types of users: a visitor and a logged-in user

###### Landing/Home Page
* As a visitor
* I want to understand what I can do with this app (or sign up, or log in) so I can decide if I want to use it

###### Login Page
* As a returning register user
* I want to enter my password and username to use this app, so I can have access to my account.

###### Sign Up/Registration Page
* As a visitor
* I want to register to use this app so I can create a personal account.

###### My Noms Page
* As a logged-in user,
* I want to be able to view the "My Noms" page of the app, so I can decide if I want to create my own "noms" or edit and delete existing ones.


### 3. Functionality
The app's functionality includes:
* Every User has the ability to create an account
* Every User has the ability to view the noms in the "My Noms" page
* Every User has the ability to "Add" a nom
* Every User has the ability to "Edit" a nom
* Every User has the ability to "Delete" a nom



### 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, PostgreSQL 
* Development Environment: Vercel, Heroku, DBeaver



### 5. Wireframes
Landing/Home Page
:-------------------------:
![Landing/Home Page](/github-images/wireframes/landing-home-page.jpg)
![Login Page](/github-images/wireframes/)
Sign Up/Registration Page
![Sign Up/Registration Page](/github-images/wireframes/register-page-wireframe.png)
My Noms Page
![My Noms Page](/github-images/wireframes/)

#### Graybox Wireframes


#### Screenshots



### 6. Front-end Structure - React Components Map (to do later)
* (Example) __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __LandingPage.js__ (stateful) - gets the _"prop name"_ and the _"callback prop name"_ from the __App.js__
            * __Login.js__ (stateful) -
            * __Register.js__ (stateful) -
        * __Navbar.js__ (stateless) -



### 7. Back-end Structure - Business Objects (to do later)
* (Example) Users (database table)
    * id (auto-generated)
    * username (email validation)
    * password (at least 8 chars, at least one alpha and a special character validation)



### 8. API Documentation (to do later)
API Documentation details:
* (Example) get all users



### 9. Screenshots (to do later)
(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page-screenshot.png)
Register Page
![Register Page](/github-images/screenshots/register-page-screenshot.png)



### 10. Development Roadmap (to do later)
This is v1.0 of the app, but future enhancements are expected to include:
* (Example) add more functionality



### 11. How to run it (done)
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test
