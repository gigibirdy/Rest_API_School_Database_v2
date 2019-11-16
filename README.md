# REST_API_School_Database

This full stack application provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database. In addition, the project will require users to create an account and sign in to make changes to the database using basic authentication.

The "api" folder contains REST API Express application which was developed with REST API design, Node.js, Express to create API routes, and the Sequelize ORM for data modeling, validation, and persistence.

The "client" folder contains React application which was developed with React, JSX, React Router, React Context API, and Create React App. React application calls the REST API application to retrieve, update, create and delete data.

## Getting Started

 To get up and running with this project, run the following commands from the api folder.

 1. Install the project's dependencies using `npm`.

 ```
 npm install

 ```

 2. Seed the SQLite database.

 ```
 npm run seed

 ```

 3. Start the application.

 ```
 npm start

 ```

 4. To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

 Then run the following commands from the client folder.

 1. Install the project's dependencies using `npm`.

 ```
 npm install

 ```

 2. Start the application.

 ```
 npm start

 ```

 3. Browse to the URL [http://localhost:3000/](http://localhost:3000/).
