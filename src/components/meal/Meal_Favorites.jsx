import React, { useState,  useEffect } from 'react'
import { Link } from 'react-router-dom';

const Meal_Favorites = () => {
    
    const favorites = JSON.parse(localStorage.getItem('favorites'))||[];
    /*const [hasFavorit, setHasFavorit] = useState(false);
    if (favorites.length> 0){
        setHasFavorit(true);
    }

    useEffect(() => {
        // Check if there are favorites when the component mounts
        setHasFavorit(favorites.length > 0);
    }, [favorites]);

*/
  return (
    <>
    {/*  {!hasFavorit && <h3>Save your favorites meals</h3> } */}
    <ul>
        {favorites.map((idMeal)=>(
         <Link to ={`/meal-details/${idMeal}`} style={{textDecoration: 'none'}}>
         <li key={idMeal}>{idMeal}</li>
         </Link>
        ))}
    </ul>
    </>
  )
}

export default Meal_Favorites