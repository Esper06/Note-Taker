const express = require("express"); //first we bring in express
const path = require("path"); //next we bring in the path module. This gives us a way to work with directories and file paths
const fs = require("fs"); //next we bring in fs. This just helps us interact with files

const app = express(); //we make a variable and give it the function express(). This is how we run express in our code

const PORT = 8080; //we make a variable called port and give it the value 8080. 8080 is a popular internet port used for proxies and caching

const mainDir = path.join(__dirname, "/public") //path.join basically joins two paths together. __dirname is whatever directory the script is being executed in, and /public is the public folder
                                                //after joining these two paths we then assign it to a variable called mainDir

app.use(express.static('public')); //express.static will serve static files to the directory known as 'public'
app.use(express.urlencoded({extended: true})); //this is a method that uses express to recognise incoming requests as strings or arrays
app.use(express.json()); //middleware that will help recognise incoming json


app.get("/notes", function(req, res) { //sends a get request to /notes
    res.sendFile(path.join(mainDir, "notes.html")); //then joins the mainDir path up with notes.html. This should take us to the notes.html page
})

