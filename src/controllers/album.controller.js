const Album = require("../models/album.model");

const getAllAlbums = (req, res) => {
  Album.getAll()
    .then((albums) => {
      if (albums !== null && albums.length > 0) {
        res.status(200).send(albums);
      } else {
        res.status(404).send("Albums not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving albums from database.");
    });
};

module.exports = {
  getAllAlbums,
};
