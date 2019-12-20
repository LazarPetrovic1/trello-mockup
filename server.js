const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const connectDatabase = require('./config/db')
const cors = require('cors')

connectDatabase()
app.use(express.json({extended: false}))
app.use(cors())

app.get('/', (req, res) => {
  res.json({msg: 'Hello, world!'})
})

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/blogs', require('./routes/api/blogs'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
