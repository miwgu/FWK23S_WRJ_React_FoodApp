import React, { useState,  useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { IoTrashOutline } from "react-icons/io5";

const Meal_Favorites = ({favorites, deleteFavorite }) => {
    
    //const favorites = JSON.parse(localStorage.getItem('favorites'))||[];
    //const [hasFavorit, setHasFavorit] = useState(false);
    const [favoritesData, setFavoritesData] = useState(favorites);
    const navigate = useNavigate();

    const handleGotoHome = () =>{
        navigate('/');
      };



    /*  const deleteFavorite = (idMeal) => {
        const updatedFav = favorites.filter((favId) => favId !== idMeal);
        const updatedFavoritesData = favoritesData.filter((meal) => meal.idMeal !== idMeal);
    setFavoritesData(updatedFavoritesData);
        localStorage.setItem('favorites', JSON.stringify(updatedFav));

    };*/
  

    useEffect(() => {
        // Check if there are favorites when the component mounts
        setFavoritesData(favorites);
    }, [favorites]);



/*
    useEffect(()=>{
     const fetchData = async () =>{
        try{
            const favoritesDetails = await Promise.all(
              favorites.map(async(idMeal)=>{
                const response = await axios
                .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
              
              return response.data.meals[0];
              })   
            );
            setFavoritesData(favoritesDetails);
        }catch(error){
            console.error('Error fetching favorites: ', error)
        }
     };


     fetchData();


    },[favorites]);

*/


  return (
    <>
    <Container className='p-5'>
      {!favoritesData.length && 
      <>
        <h3>Save your favorites meals</h3>
        <p>
        You haven't saved anything yet. <br /> Click on the heart symbol under the meals and they will appear here.
        </p>
        <Button variant="primary" onClick={handleGotoHome }>Search for more meals</Button>
        </>
         }
     {favoritesData.length > 0 &&

     <>
        <h3>Favorites</h3> 
    <Row className="justify-content-center">
        {favoritesData.map((meal)=>(
        <Col sm={favoritesData.length <= 1 ? 6 : 4} className= "mb-2" key={meal.idMeal}>
          <Card 
                    style={{width:'100%'}} 
                    key={meal.idMeal}
                    
                >
              <Link to ={`/meal-details/${meal.idMeal}`} style={{textDecoration: 'none'}}>
                <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} />
                <Card.Body>
                    <Card.Title>
                        {meal.strMeal}
                    </Card.Title>
                </Card.Body>
              </Link>

               <div className= "mb-2"
                   onClick={()=>deleteFavorite(meal.idMeal)}
              >
              <IoTrashOutline />
              </div> 

          </Card>
         </Col>
        ))}
    </Row>
    </>
}
    </Container>
    </>
  )
}

export default Meal_Favorites