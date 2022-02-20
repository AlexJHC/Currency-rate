import React from 'react';
import './App.css';
import Main from './components/main/Main';

export default function App() {
  console.log(process.env.REACT_APP_CURRENCY_KEY)
  return (
    <Main/>
  )
}

