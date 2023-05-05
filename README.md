# QUIZ SOLUTION

1. Indicate what are the parts of the following url: https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone

A url is composed of a protocol, subdomain, domain, port, path, query paramenters, and fragment identifier.

- Protocol: _https://_, this is a secure transfer protocol to transfer data over the internet.
- Subdomain: _backend_, it is optional and comes before the url domain.
- Domain: _mega-app.com.co_, is the name of the website that the url points to.
- Port: _8080_, is a specific number to connect to the server, it is not requiered all the time.
- Path: _/api/articles/search_, it points to the location of the resource on the server.
- Query parameters: _docid=1020&hl=en_, this parameters are preceded by a "?" and separated by "&". They are used to pass aditional information to the server.
- Fragment identifier: _dayone_, it refers to a specific sectionbeing accessed.This parameteer is optional.

2. Define what is a Web API, Restful and what are the statusCode 200-, 400-, 500-

An API is an architecture to build web services, access data, and create funtionality over the internet. Is stands for Application Programming Interface. REST is a set of principles to guide how web services communicate with each other. It stands out for Representational State Transfer. The typical data format to transfer the data is a JSON file.

Status codes are grouped in five set changing from 100 to 500.

- 200: Ok status, indicates the request was successful. The server did return the requested data.
- 400: Bad request, indicates the request is invalid or malformed, so the server was unable to procees it.
- 500: Internal server error, indicates there was an error on the server side.

3. When we talk about CRUD, what does it mean?

CRUD are the main operations we perform for sending or requesting data. It stands out for Create, Read or Retrieve, Update, and Delete. This operations form the foundation of database applications.

# USER INSTRUCTIONS

## Instructions

This API aims to provide a better way to organize your favorite things: music, clothes, courses, etc., all in one place. You can create a user, then login into your account to create a list of favorite things you like, and finally add items to your list. Later on, this API can be consumed with a frontend application to ultimately allow a nicer user interface (UI).

## Pre-requisites

First you need an empty MySQL data base to connect to. Make sure you have a user, a password and the port number to connect to your data base. The data base connection is setup with a connection string that needs those parameters.

Finally, you also need a REST Client to test the different request methods (CREATE, GET, UPDATE, DELETE) with the API endpoints. You can use the one you prefer, for example, Postman, Thunder Client, or Insomnia.

## Using the API:

### 1. Download the files

Download the files from the repository to your local computer. Fork or Clone options are available in the Github repository.

### 2. Create a dotenv (.env)

In the root folder (from the downloaded repository) create a new .env file.
Open the . env file and setup your environment variables writing these lines:

```js
DATABASE_URL = "copy your connection string to your mysql data base here";
PORT = "write the port number you want to use here";
SECRET =
  "copy a string you want to use a secret to generate authorization tokens";
```

- Here is an example of how it should look like:

```js
DATABASE_URL = "mysql://myuser:mypassword@localhost:3306/my_database";
PORT = 4000;
SECRET = "this_is_a_nice_secure_string:_eluieIqUpRM0u6SZs716SwOiD29c0E";
```

### 3. Install package.json dependencies

Before running the API, you need to install the dependencies. Open a terminal in your project folder and run de command: npm install.

### 4. Synchronize the schema and the database

In a terminal window run the comand _npx prisma migrate reset_. If your data base is connected this command will errase your mysql-model (and data also), create a new one, an because the repository has a migration folde included, I'will run this migration to start anew.

### 5. Run the API

After dependencies are installed, open a terminal in your project folder and run de command: npm start.

Now you should see a message in your terminal window displaying: Server Initialized on PORT.

### 6. TEST endpoints

Use your REST client to make the request to the available endpoints. You can find a list of endpoints in the table below.

Also, there is a folder in the repository with a backup file that has a collection of requests that can be imported into your REST Client (see folder src/restclient_backup_collection).

#### **_Workflow example_**

- Create a new user:

By using the route **_/user/signup_**, and the post method. Write the email and password in the body request and make sure you pass the data in a JSON format. The creation has some verification so make sure you enter a valid email and a strong password.

Example:

```json
{
  "email": "testme@example.com",
  "password": "Test123!",
  "repassword": "Test123!"
}
```

- Login:

Login with the user you created. The route is: **_/user/auth/local/login_** and the method is post. Use the email and password in the body request and write it in a JSON format.

Example:

```json
{
  "email": " testme @example.com",
  "password": "Test123!"
}
```

_IMPORTANT_: You will get a response with the token as a string. This token has to be copied and pass for the next endpoints to work properly.

**Pass the token** _in the request headers_: After login in, for each of the endpoints below. The token got to be _paste in the header_ in order to get a valid response. First open the request, go to the headers tab, fill in a new header with the title **Authorization**, then right next to it write this as the value: first the word **Beared** follow by a blank space and finally the **token** you copied.

- Create a new list:

Create a new list of favorites: route is **_/api/favs_** and method is post. Write the name for the list and the user for that list.

Example:

```json
{
  "name": "next week",
  "user_iduser": 1
}
```

- Create a new item:

Create a new item for the list: route is **_/item/:id_**, and method is post. Note that **_:id_** should be change to match the id of the list to include the item to. Write the title, description, link, and list id in the body request using a JSON format.

Example:

```json
{
  "title": "playing guitar",
  "description": "Every day I practice 15 minutes",
  "link": "https://youtu.be/w4a2ge9N31E",
  "lists_idlist": 1
}
```

- Get all the lists :

Get all the lists of favorites. route: **_/api/favs_**, and method get. Write down into the body request the id for the user to display.

Example:

```json
{
  "userId": 1
}
```

- Get only one list :

Get only one list of favorites: route **_/api/favs/:id_**, and method get. Note that **_:id_** should be change to match the id of the list to be displayed.

- Delete a list :

Delete a list: route **_/api/favs/:id_**, and method delete. Note that **_:id_** should be change to match the id of the list to be deleted.

**_CAUTION_**: beware that by deleting a list, the items of the list will be deleted as well.

### 7. Verify changes

Finally, after testing the endpoints you will see that your database has now been changed according to the endpoint that you tested.
