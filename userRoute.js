const express = require('express');
const router = express.Router();
const db = require('./data/db');
router.use(express.json())


// //GET request to /api/posts
// router.get('/', (req,res) =>{
//     db.find()
//     .then(user => {
//         res.status(200).json(user);
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({ errorMessage: "The posts information can't be retrieved."})
//     })
// })

router.get('/'), async (res, req) => {
    try {
        const posts = await db.find(query);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "the posts"
        })
    }
}

// //POST request to /api/posts
// //If the request body is missing the title or contents property:
router.post('/', async (req,res) => {
    try{
    const post = await db.insert(req.body);
    res.status(201).json(post) 
} catch (error){
    res.status(500).json({
        message: 'please provide title and contents for the post.'
    })
}
})


// //     if(!dbData.title || !dbData.contents){
// //         res.status(400).json({
// //             errorMessage: 'Please provide title and contents for the post.'
// //         })
// //     } else {
// //         db.insert(dbData)
// //         .then(user => {
// //             res.status(201).json(user)
// //         })
// //         .catch(err => {
// //             console.log(err)
// //             res.status(500).json({
// //                 error: 'There was an error while saving the post to the database'
// //             })
// //         })
// //     }
// // })

// //GET request to /api/posts/:id
// // router.get('/:id', (req,res) =>{
// //     const id = req.params.id;
// //     db.findById(id)
// //     .then(data => {
// //         if (!id){
// //             res.status(404).json({ message:'The post with the specified ID does not exist.'})
// //         } else {
// //             res.status(201).json({data})
// //         }
// //     })
// //     .catch(err => {
// //         console.log(err)
// //         res.status(500).json({ error: 'The post information could not be retrieved.'})
// //     })
// // })

router.get('/:id', async (req,res) =>{
    try{
        const post = await db.findById(req.params.id);

        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'this id doesnt exist'})
        }
    } catch (error){
        res.status(500).json({
            message: 'the information cannot be retrieved'
        })
    }
})

// POST request to /api/posts/:id/comments
// router.post('/:id/comments', (req,res) => {
//     const id = req.params.id;
//     const dbData = req.body;
//     db.findById(id)
//     .then(comment => {
//         if(!id){
//            res.status(404).json({message: 'The post with the specified ID does not exist.'}) 
//         } else if(!dbData.text){
//             res.status(400).json({errorMessage: 'Please provide text for the comment.'})
//         } else {
//             res.status(201).json({ comment })
//         }
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({ errorMessage: 'There was an error while saving the post to the database.'})
//     })
// })

//post new message with specific id
router.post('/:id/comments', async (req, res) => {
    const messageInfo = {...req.body, post_id: req.params.id}
    try{
        const saved = await db.insertComment(messageInfo)
        res.status(201).json(saved)
    }   catch (err) {
        res.status(500).json({
            message: 'please provide text for the comment.',
            err
        });
    }
});

// // GET request to /api/posts/:id/comments
// router.get('/:id/comments', (req,res) => {
//     const id = req.params.id;
//     db.findById(id)
//         .then(comment => {
//             if(!id){
//                 res.status(404).json({ message: 'The post with the specified ID does not exist.'})
//             } else {
//                 res.status(201).json(comment)
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 errorMessage: 'The comments information could not be retrieved.'
//             })
//         })
// })

// find post comments by id
router.get('/:id/comments', async (req, res) => {
    const id = req.params.id;

    try{
        const messages = await db.findPostComments(id);
        if (messages.length){
            res.json(messages)
        }   else {
            res.status(404).json({message: 'the post with the specified id does no exist'})
        }
    } catch (err){
        res.status(500).json({errorMessage: 'please provide text for the comment.'})
    }
})

// //DELETE request to /api/posts/:id
router.delete('/:id', async (req,res) => {
    try{
        const count = await db.remove(req.params.id);
        if(count > 0){
            res.status(200).json({message: 'the post has been deleted'});
        } else {
            res.status(404).json({message: 'the post with the specified id does not exist.'})
        }
}   catch (error){
    res.status(500).json({
        message: 'the post could not be removed'
    })
}
})

// //PUT request to /api/posts/:id
// router.put("/:id", (req, res) => {
//     const id = req.params.id;
//     const db = req.body;
//     db.update(id, db)
//     .then(updated => {
//         if (!id) {
//             res.status(404).json({
//                 message: "Post with the specified ID does not exist"
//             })
//         } else if (!daData.title || !daData.contents) {
//           res.status(400).json({
//               message: "Please provide title and contents for the post"
//           })
//         } else {
//             res.status(200).json({ updated })
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: "The post information can't be modified"
//         });
//     });
//   });

router.put('/:id', async (req, res)=> {
    try{
        const post = await db.update(req.params.id, req.body);
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message:  'the post with the specified id does not exist'})
        }
    } catch (error) {
        res.status(500).json({
            message: 'the post information could not be modified'
        })
    }
})

module.exports = router;