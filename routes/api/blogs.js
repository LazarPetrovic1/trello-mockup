const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Blog = require('../../models/BlogPost')

// Make blog
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('content', 'Content (at least textual) is required for a post')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Blog({
        title: req.body.title,
        content: req.body.content,
        process: req.body.process,
        user: req.user.id
      })

      const post = await newPost.save()
      res.json(post)
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Internal server error.')
    }
  }
)

// Get all blogs
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Blog.find().sort({ date: -1 })
    res.json(posts)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ msg: 'Internal server error.' })
  }
})

// Get a specific blog
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' })
    }

    res.json(post)
  } catch (e) {
    console.error(e.message)

    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.status(500).send('Internal server error.')
  }
})

// Remove the blog post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised.' })
    }

    await post.remove()

    res.json({ msg: 'Post removed.' })
  } catch (e) {
    console.error(e.message)

    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.status(500).send('Internal server error.')
  }
})

// Update the post
router.put('/:id', auth, async (req, res) => {
  const {
    title,
    content,
    process
  } = req.body

  const postFields = {}
  postFields.user = req.user.id
  if (title) postFields.title = title
  if (content) postFields.content = content
  if (process) postFields.process = process

  try {
    let post = await Blog.findById(req.params.id)
    if (post) {
      post = await Blog.findOneAndUpdate(
        {user: req.user.id},
        {$set: postFields},
        {new: true}
      )
    }

    await post.save()
    return res.json(post)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
})

router.put('/process/:id', auth, async (req, res) => {
  const {
    title,
    content,
    process
  } = req.body

  const postFields = {}
  postFields.user = req.user.id
  if (title) postFields.title = title
  if (content) postFields.content = content
  if (process) postFields.process = process

  // try {
  let post = await Blog.findById(req.params.id)

  post.process = req.body.process
  post.order = req.body.order
  post.save()
})

module.exports = router
