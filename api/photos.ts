import * as express from 'express';
import database from '../db';
import * as mongodb from 'mongodb';

let router = express.Router();

// GET single product
router.get('/:id', (req, res) => {
  let photoId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('photos').findOne(photoId).then((photo)=> {
    res.json(photo);
  });
});

// GET products
router.get('/', (req, res) => {
  database.db.collection('photos').find().toArray().then((photos)=>{
    res.json(photos);
  })
});

// Create/Update product
router.post('/', (req, res) => {
  let photo = req.body;
  photo._id = new mongodb.ObjectID(photo._id); // convert _id to object
  database.db.collection('photos').save(photo).then((newPhoto) => {
    res.json(newPhoto);
  })
});

export default router;
