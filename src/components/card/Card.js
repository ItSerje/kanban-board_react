import React from 'react'
import './style.css'

const Card = ({ card }) => {
  const { id, author, text } = card
  return (
    <div className='card'>
      <h1>Author: {author}</h1>
      <p>{text}</p>
    </div>
  )
}

export default Card
