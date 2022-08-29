import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CardsList from './components/cardsList/CardsList';
import testJson from './test.json';

function App() {
  return (
    <section className='dashboard'>
      <CardsList cards={testJson} />
      <CardsList cards={testJson} />
      <CardsList cards={testJson} />
      <CardsList cards={testJson} />
    </section>
  );
}

export default App;
