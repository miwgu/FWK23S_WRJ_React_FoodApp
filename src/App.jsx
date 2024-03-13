import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import Meal_Page from './components/meal/Meal_Page';
import { useState, useEffect } from 'react';
import MealDetails from './components/meal/MealDetails';
import Meal_Favorites from './components/meal/Meal_Favorites';
import Meal_Rating from './components/meal/Meal_Rating';



function App() {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
  const [searchTerm, setSearchTerm]= useState('');
  const [favorites, setFavorites] = useState(storedFavorites);
  const navigate = useNavigate();

  /*-------------App.jsx is parent for Meal.jsx  Use this function in Meal.jsx --------------*/
  const toggleFavorite = (meal) =>{
    const {idMeal, strMealThumb, strMeal}=meal;
    // Check if the meal is already in favorites
    const isFavorite = favorites.some((fav) => fav.idMeal === idMeal);

    let updatedFav;

    if (isFavorite){

      updatedFav = favorites.filter((fav) => fav.idMeal !== idMeal);
    } else {
      updatedFav = [...favorites, { idMeal, strMealThumb, strMeal }];
    }

    setFavorites(updatedFav); 
    localStorage.setItem('favorites',JSON.stringify(updatedFav));
    //onToggleFavorite(idMeal); // Call onToggleFavorite after updating favorites
};

 /*-------------App.jsx is parent for Meal_Favorite.jsx Use this function in Meal_Favorites.jsx --------------*/
    
  const deleteFavorite = (idMeal) => {
    const updatedFav = favorites.filter((favId) => favId !== idMeal);
    const updatedFavoritesData = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavoritesData);
    localStorage.setItem('favorites', JSON.stringify(updatedFav));

  };



  useEffect(()=>{
    //const storedfavorites = JSON.parse(localStorage.getItem('favorites'))||[];
    //setFavorites(storedfavorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (term) =>{
    setSearchTerm(term);
    navigate('/');
  };

/*
 const toggleFavorite= (idMeal) =>{
    const updatedFav = favorites.includes(idMeal)
          ?  favorites.filter((favId)=>favId !== idMeal)
          : [...favorites, idMeal];
       setFavorites(updatedFav); 
       localStorage.setItem('favorites',JSON.stringify(updatedFav));
   };*/


  return (
    <>
    <MyNav onSearch={handleSearch} />
      <Routes>
        <Route path='/' 
        element={<Meal_Page searchTerm={searchTerm}  favorites={favorites}  toggleFavorite={toggleFavorite} />} />
        <Route path="/meal-details/:mealId" element={<MealDetails/>} />
        <Route path="/meal-favorites" element={<Meal_Favorites favorites={favorites} deleteFavorite={deleteFavorite} />} />
        <Route path ="/meal-rating" element={<Meal_Rating />} />
      </Routes>

    </>
  )
}

export default App
