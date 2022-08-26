import React from 'react'

const Card = (author, text) => {
  return (
    <div>
      <h1>Author: {author}</h1>
      <p>{text}</p>
    </div>
  )
}

export default Card
