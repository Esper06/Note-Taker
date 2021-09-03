const express = require("express"); //first we bring in express
const path = require("path"); //next we bring in the path module. This gives us a way to work with directories and file paths
const fs = require("fs"); //next we bring in fs. This just helps us interact with files

const app = express(); //we make a variable and give it the function express(). This is how we run express in our code

const PORT = process.env.PORT || 8080; //we make a variable called port and give it the value 8080. 8080 is a popular internet port used for proxies and caching

app.use(express.static('public')); //express.static will serve static files to the directory known as 'public'
app.use(express.urlencoded({extended: true})); //this is a method that uses express to recognise incoming requests as strings or arrays
app.use(express.json()); //middleware that will help recognise incoming json



app.get("/notes", (req, res) => { //this is our route to notes.html
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//route to db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json")); //this will return all saved notes as json
});


app.get("*", (req, res) => { //gets the homepage (index.html)
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//recieves a new note from the request body, adds it to db.json, then updates the database so that the note becomes accessable
app.post("/api/notes", (req, res) => {
    var newNote = req.body; //a new note is made from the text in the request body and assigned to a variable
    var noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); //make a variable of all the notes parsed. This is so we can add newNote later
    var notelength = (noteList.length).toString(); //we check how many notes we have in the list. This allows us to add id's to the notes

    newNote.id = notelength; //the length of the note list becomes the id of the new note. E.g: if there are 5 notes and you add one more, the new note's id will be "6"
    
    noteList.push(newNote); //we push the new note to the list of notes

    //finally we write the updated data to db.json so that it replaces the old db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});


//deletes a note based on what their id is. The id is added when the note is posted
app.delete("/api/notes/:id", (req, res) => { //we target a specific note based on the id
    var noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); //once again we make a variable that is a list of all the saved notes
    var noteId = (req.params.id).toString(); //we turn the requested id into a string. This is because the note id's are all strings

    noteList = noteList.filter(selected =>{ //we filter all the notes by id. The ones that do not have a matching id with the request will be saved in a new array
        return selected.id != noteId       //whereas the matching id gets deleted
    });

    //write the updated data to db.json and display the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

//displays what port you are on in the console log
app.listen(PORT, () => console.log("Server listening on port " + PORT));