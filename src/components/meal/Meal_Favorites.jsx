import React, { useState,  useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Meal_Favorites = () => {
    
    const favorites = JSON.parse(localStorage.getItem('favorites'))||[];
    const [hasFavorit, setHasFavorit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there are favorites when the component mounts
        setHasFavorit(favorites.length > 0);
    }, [favorites]);

    const handleGotoHome = () =>{
        navigate('/');
      };

  return (
    <>
      {!hasFavorit && 
      <>
        <h3>Save your favorites meals</h3>
        <p>
        You haven't saved anything yet. <br /> Click on the heart symbol under the meals and they will appear here.
        </p>
        <Button variant="primary" onClick={handleGotoHome }>Search for more meals</Button>
        </>
         }
    <ul>
        {favorites.map((idMeal)=>(
        <li key={idMeal}>
          <Link to ={`/meal-details/${idMeal}`} style={{textDecoration: 'none'}}>
            {idMeal}
          </Link>
         </li>
        ))}
    </ul>
    </>
  )
}

export default Meal_Favorites