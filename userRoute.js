const express = require('express');
const router = express.Router();
const db = require('./data/db');
router.use(express.json())

//GET request to /api/posts
router.get('/', (req,res) =>{
    db.find()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: "The posts information can't be retrieved."})
    })
})

//POST request to /api/posts
//If the request body is missing the title or contents property:

router.post('/', (req,res) => {
    const dbData = req.body;
    if(!dbData.title || !dbData.contents){
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.'
        })
    } else {
        db.insert(dbData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'There was an error while saving the post to the database'
            })
        })
    }
})

//GET request to /api/posts/:id
router.get('/:id', (req,res) =>{
    const id = req.params.id;
    db.findById(id)
    .then(data => {
        if (!id){
            res.status(404).json({ message:'The post with the specified ID does not exist.'})
        } else {
            res.status(201).json({data})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
})

//POST request to /api/posts/:id/comments
router.post('/:id/comments', (req,res) => {
    const id = req.params.id;
    const dbData = req.body;
    db.findById(id)
    .then(comment => {
        if(!id){
           res.status(404).json({message: 'The post with the specified ID does not exist.'}) 
        } else if(!dbData.text){
            res.status(400).json({errorMessage: 'Please provide text for the comment.'})
        } else {
            res.status(201).json({ comment })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'There was an error while saving the post to the database.'})
    })
})

//GET request to /api/posts/:id/comments
router.get('/:id/comments', (req,res) => {
    const id = req.params.id;
    db.findById(id)
        .then(comment => {
            if(!id){
                res.status(404).json({ message: 'The post with the specified ID does not exist.'})
            } else {
                res.status(201).json(comment)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: 'The comments information could not be retrieved.'
            })
        })
})

//DELETE request to /api/posts/:id
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    db.remove(id)
    .then(post => {
        if(!id){
            res.status(404).json({ message: "The post with the specified ID doesn't exist."})
        } else {
           res.status(201).json({post})
        }   
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'The post could not be removed'})
    })
})

//PUT request to /api/posts/:id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const dbData = req.body;
    db.update(id, dbData)
    .then(updated => {
        if (!id) {
            res.status(404).json({
                message: "Post with the specified ID does not exist"
            })
        } else if (!daData.title || !daData.contents) {
          res.status(400).json({
              message: "Please provide title and contents for the post"
          })
        } else {
            res.status(200).json({ updated })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The post information can't be modified"
        });
    });
  });

module.exports = router;