import Home from './components/Home';
import ReviewForm from './components/ReviewForm';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' default/>
          <Route element={<ReviewForm/>} path='/review/:id'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
