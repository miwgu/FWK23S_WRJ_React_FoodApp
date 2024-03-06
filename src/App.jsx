import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import Meal_Page from './components/meal/Meal_Page';
import { useState } from 'react';



function App() {
  const [searchTerm, setSearchTerm]= useState('');

  const handleSearch = (term) =>{
    setSearchTerm(term);
  };

  return (
    <>
    <MyNav onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Meal_Page searchTerm={searchTerm}/>} />
      </Routes>

    </>
  )
}

export default App
