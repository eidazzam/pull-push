import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ShortPolling() {
  const BACKEND_URL = 'http://localhost:6006'
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setInterval(() => {
      axios.get(`${BACKEND_URL}/messages`).then((res) => {
        setMessages(res.data)
      })
    }, 5000)
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    axios
      .post(`${BACKEND_URL}/messages`, { message })
      .then((res) => {
        console.log(res)
        setMessage('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="form-wrapper">
        <form className="form-container" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="poll-question">Send a message</label>
            <input
              type="text"
              className="form-control"
              id="poll-question"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </form>
      </div>
      <section>
        <div>
          <h3>Messages</h3>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message.message}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default ShortPolling
