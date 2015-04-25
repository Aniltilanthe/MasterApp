# MasterApp
*Improve Health with Technology*

*Master branch

Using MEAN stack - a fullstack javascript framework.
M- Mongodb    - a NoSQL database
E- Express JS 
A- Angular JS - Client framework
N- Node JS
The major benefit of the MEAN stack is that it's extremely quick to prototype with. 
Node.js allows you to use Javascript on the backend as well as the frontend which can save you from 
having to learn a separate language. 
In addition, the NoSQL nature of MongoDB allows you to quickly change and alter the data layer without having to worry
about migrations, which is a very valuable attribute when you're trying to build a product without clear specifications. 

Tutorial : https://thinkster.io/mean-stack-tutorial/

1. Install node.js
2. Install mongodb
3. Install packages specified in packages.json
    npm install -g express-generator
    npm install
4. Run this command to install Mongoose via npm
    npm install --save mongoose
5. Install jsonwebtoken via npm
    npm install jsonwebtoken --save
6. Install passport & passport-local via npm
    npm install passport passport-local --save
7. Install express-jwt via npm
    npm install express-jwt --save
    
We are using:-
Mongoose.js for adding structure to MongoDB
Angular ui-router for client-side routing
Twitter Bootstrap for some quick styling

____________________________________________________________    
Project File Structure:-

app.js - This file is the launching point for our app. We use it to import all other server files including modules, 
          configure routes, open database connections, and just about anything else we can think of.

bin/ - This directory is used to contain useful executable scripts. By default it contains one called www. 
        A quick peak inside reveals that this script actually includes app.js and when invoked, starts our Node.js server.

node_modules - This directory is home to all external modules used in the project. 
                As mentioned earlier, these modules are usually installed using npm install. 
                You will most likely not have to touch anything here.

package.json - This file defines a JSON object that contains various properties of our project including things such as name 
                and version number. 
                It can also defined what versions of Node are required and what modules our project depends on. 
                A list of possible options can be found in npm's documentation.

public/ - As the name alludes to, anything in this folder will be made publicly available by the server. 
          This is where we're going to store JavaScript, CSS, images, and templates we want the client to use.

routes/ - This directory houses our Node controllers and is usually where most of the backend code will be stored.

views/ - As the name says, we will put our views here. Because we specified the --ejs flag when initializing our project, views will have the .ejs extension as opposed to the '.jade' extension Jade views use. Although views are ultimately HTML, they are slightly different than any HTML file we might specify in the public/ directory. Views are capable of being rendered directly by Node using the render() function and can contain logic that allows the server to dynamically change the content. 
          Because we are using Angular to create a dynamic experience, we won't be using this feature
____________________________________________________________________
