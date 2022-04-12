import Home from './components/Home';
import ReviewForm from './components/ReviewForm';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState} from 'react';
import ReviewList from './components/ReviewList';
import Edit from './components/Edit';
import View from './components/View';

function App() {
  const [review, setReview] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' default/>
          <Route element={<ReviewForm review={review} setReview={setReview}/>} path='/review/:id'/>
          <Route element={<ReviewList review={review} setReview={setReview}/>} path='reviews'/>
          <Route element={<Edit/>} path='/edit/:id'/>
          <Route element={<View/>} path='/view/:id'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
