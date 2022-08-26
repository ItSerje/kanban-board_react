import React from 'react'
import logo from './logo.svg'
import './App.css'
import CardsList from './components/cardsList/CardsList'
import testJson from './test.json'

function App() {
  return (
    <div className='App'>
      <div className='dashboard'>
        <CardsList cards={testJson} />
        <CardsList cards={testJson} />
        <CardsList cards={testJson} />
        <CardsList cards={testJson} />
      </div>
    </div>
  )
}

export default App
