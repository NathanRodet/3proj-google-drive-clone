# Project : 3PROJ
## Description :

End of year Bachelor project, a Node.js based Progressive Web App (PWA) and the documentation concerning its functioning, our technical choices and its support architecture.

##  Topic : 

X company hired you to develop a new solution to create, display, store and allow access to a storage solution. You will need to design both the backend and the frontend, but also the hardware or cloud architecture.
The solution is supposed to run on both web or mobile plateform. You also need to explain the server architecture which support your solution based on prices, performances and sustainability over scalability.

#  Functionnal expression

##  Generalities :

 - The solution must be available 24/7, without interruption.
 - Users datas must not be able to be lost.
 - Users must always knows if an operation is succesful or not.

## Technical stack :

- **Front-end** : React.js.
	- **libraries** : 
		- Ant design, bulma chakra-ui.
- **Back-end** : Express.js.
	- **librairies** : 
		- JSON Web Token.
		- Mongoose.
		- Cors.
- **Database** : MongoDB (NoSQL).
-  **Web-server** : Cloud provided Linux VPS.
	- **Provider** : 

# Software development features :

## Customers features :

 - Create an account.
 - Log in and log out.
 - Display a list of documents.
 - Display informations about each documents [file_name, file_upload_date, file_size, file_type, ...]
 - Display a preview if the document is an image.
 - Render a preview if the is a video.
 - Upload a new document.
 - Allow copy/past of existing document.

### Bonus features for customers:

 - Delete a document if it belongs to the user.
 - Delete account and datas if it belongs to the user.
 - Modify your datas.

## Admin features :

 - List all users.
 - Block an user.
 - See the storage used by an user.
 - Access to users documents.
 - Monitoring informations [resources used, errors...]

### Bonus features for admin:

 - Delete a document.
 - Delete accounts and datas.
 - Count the users
 - Get user by id

# Supporting architecture :

The architecture is simple and affordable in terms of cost and size, we choose cloud-based solutions to avoid maintenance costs, security and win robustness on the machines.

## Database

- Database must isolate the data from the configuration and the operation to prevent critical data leak risks in case of database exposure.
- Optimization : Policies for deleting or compressing for no longer relevant data.

## Web server

- The webserver is also hosting the administrator backoffice, so we must had provided extra security configuration accordingly. 

## Monitoring

- We setup security alert depending on the server services status and resources.

# Documentation

- UML diagram.
- Network and cloud architecture schema.
- Step-by-step implementation guide.
- Server configuration files.
- Database clean-up scripts.
- User manual.
- Video of presentation of the solution.

> Written with [StackEdit](https://stackedit.io/).