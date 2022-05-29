const express = require('express')
const app = express()

const cors = require('cors')

const messages = []

app.use(cors())
app.use(express.json())

//short polling get & post methods
app.get('/messages', (req, res) => {
  res.json(messages)
})

app.post('/messages', (req, res) => {
  const { body } = req
  messages.push(body)
  console.log('Message sent')
  res.status(204).end()
})

//long polling get & post methods
let subcribers = {}
app.get('/long-sub', (req, res) => {
  const ID = Math.ceil(Math.random() * 100000)
  subcribers[ID] = res
})

app.post('/long', (req, res) => {
  const { body } = req
  Object.entries(subcribers).forEach(([ID, res]) => {
    const response = subcribers[ID]
    console.log(body)
    response.json(body)
    delete subcribers[ID]
  })
  res.status(204).end()
})

app.listen(6006, () => {
  console.log('Server started on port 6006')
})
