import React from 'react'
import Card from '../card/Card'
import './style.css'

const CardsList = ({ cards }) => {
  return (
    <div className='cards'>
      {cards.map((card) => (
        <>
          {console.log(card)}
          <Card card={card} key={card.id} />
        </>
      ))}
    </div>
  )
}

export default CardsList
