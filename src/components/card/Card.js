import React from 'react'
import './style.css'

const Card = ({ card }) => {
  const { id, author, text } = card
  return (
    <article className='card'>
      <h1>Author: {author}</h1>
      <p>{text}</p>
    </article>
  )
}

export default Card
