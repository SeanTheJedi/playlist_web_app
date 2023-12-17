//adding express to code
const express = require("express");
const app = express();

// selecting a port number for application
const HTTP_PORT = process.env.PORT || 8080

// code to enable automatic accces to css files and images
app.use(express.static("assets"));


//template code
const onHttpStart = () => {
    console.log("The web server has started...");
    console.log(`Server is listening on port ${HTTP_PORT}`);
    console.log("Press CTRL+C to stop the server.");
};

//express handle bars code
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// array of songs
const music = [
    {
        id: "M001",
        title: "No Role Modelz",
        artist: "J. Cole",
        artistImage: "J. Cole.jpeg",

    },
    {
        id: "M002",
        title: "Jimmy Cooks",
        artist: "Drake",
        artistImage: "drake.jpeg",

    },
    {
        id: "M003",
        title: "Co-Star",
        artist: "Amaarae",
        artistImage: "Amaarae1.jpg",

    },
    {
        id: "M004",
        title: "Rich Spirit",
        artist: "Kendrick Lamar",
        artistImage: "kendrick.jpeg",

    },
]

// initializing playlist array
let playlist = []

// home page endpoint
app.get("/", (req, res) => {
    res.render("home", { 
        layout: "pageLayout",
        songs: music 
    })
})

// playlist endpoint
app.get("/playlist", (req, res) => {
    res.render("playlist", { 
        layout: "pageLayout", 
        songs: playlist
    })
})

// add-song endpoint with the son id as a parameter
app.post("/addSong/:songId", (req, res) => {
    const songId = req.params.songId

    for (item of music) {
        if( songId === item.id) {
            playlist.push(item)
            res.redirect("/playlist")
        }
    }

})

// remove a song form the playlist
app.post("/delSong/:songId", (req, res) => {
    const songId = req.params.songId

    for(let i = 0; i < playlist.length; i++){
        if (playlist[i].id === songId){

            playlist.splice(i, 1)
            res.redirect("/playlist")
        }
    }

})


// code to start server
app.listen(HTTP_PORT, onHttpStart);