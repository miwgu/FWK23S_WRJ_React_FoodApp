import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import Meal_Page from './components/meal/Meal_Page';
import { useState } from 'react';
import MealDetails from './components/meal/MealDetails';
import Meal_Favorites from './components/meal/Meal_Favorites';



function App() {
  const [searchTerm, setSearchTerm]= useState('');
  const navigate = useNavigate();

  const handleSearch = (term) =>{
    setSearchTerm(term);
    navigate('/');
  };

  return (
    <>
    <MyNav onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Meal_Page searchTerm={searchTerm}/>} />
        <Route path="/meal-details/:mealId" element={<MealDetails/>} />
        <Route path="/meal-favorites" element={<Meal_Favorites/>} />
      </Routes>

    </>
  )
}

export default App
