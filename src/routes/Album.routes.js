const express = require('express');
const albumRouter = express.Router()
const AlbumController = require("../controllers/album.controller")

//* as a user, I want to be able to see all albums.
//* endpoint: /albums
albumRouter.get("/", AlbumController.getAllAlbums)




//* as a user, I want to be able to see an album by entering its id in the url.


module.exports = albumRouter