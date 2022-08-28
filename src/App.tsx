import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CardsList from './components/cardsList/CardsList';
import testJson from './test.json';

function App() {
  return (
    <div className='App'>
      <section className='dashboard'>
        <CardsList cards={testJson} />
        <CardsList cards={testJson} />
        <CardsList cards={testJson} />
        <CardsList cards={testJson} />
      </section>
    </div>
  );
}

export default App;
