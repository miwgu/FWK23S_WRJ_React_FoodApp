import React from 'react'

const Meal_Favorites = () => {

    const favorites = JSON.parse(localStorage.getItem('favorites'))||[];
  return (
    <>
    <div>Meal_Favorites</div>
    <ul>
        {favorites.map((idMeal)=>(
         <li key={idMeal}>{idMeal}</li>
        ))}
    </ul>
    </>
  )
}

export default Meal_Favorites