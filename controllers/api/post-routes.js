const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get("/", (req, res) => {
    // Access our Post model and run .findAll() method)
    Post.findAll({attributes: ['id', 'post_url', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']], 
    include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
    
  
  // GET /api/posts/1
  router.get('/:id', (req, res) => {
    Post.findOne(
         {
            where: {
                id: req.params.id
              },
              attributes: ['id', 'post_url', 'title', 'post_text', 'created_at'],
              include: [
                {
                  model: User,
                  attributes: ['username']
                }
              ]
            })
            .then(dbPostData => {
                if (!dbPostData) {
                  res.status(404).json({ message: 'No post found with this id' });
                  return;
                }
                res.json(dbPostData);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              });
          });
  
  // POST /api/posts
  router.post('/', (req, res) => {
      
      Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        post_text: req.body.post_text,
        user_id: req.session.user_id
      })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

  // PUT /api/posts/1
  router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // DELETE /api/posts/1
  router.delete('/:id', (req, res) => {
    Post.destroy(
          {
           where: {
               id: req.params.id
           },
          }
       )
       .then(dbPostData => res.json(dbPostData))
       .catch(err => {
         console.log(err);
         res.status(500).json(err);
       });
  });



module.exports = router;