import React from 'react';
import './App.css';
import Uploader from './components/Uploader/Uploader';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Uploader />
      <Footer/>
    </div>
  );
}

export default App;
