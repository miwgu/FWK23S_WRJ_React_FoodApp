import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Container } from 'react-bootstrap';
import { fetchMeals } from '../api/getMeals';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const Meal = ({searchTerm, favorites, toggleFavorite}) => {
    
    //const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
    const [data, setData]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    const [favoritesData, setFavoritesData] = useState(favorites);
    const [hoveredMealId, setHoveredMealId] = useState(null);

/* move to App.jsx
    const toggleFavorite = (meal) =>{
        const {idMeal, strMealThumb, strMeal}=meal;
        // Check if the meal is already in favorites
        const isFavorite = favoritesData.some((fav) => fav.idMeal === idMeal);

        let updatedFav;

        if (isFavorite){

          updatedFav = favoritesData.filter((fav) => fav.idMeal !== idMeal);
        } else {
          updatedFav = [...favoritesData, { idMeal, strMealThumb, strMeal }];
        }

        setFavoritesData(updatedFav); 
        localStorage.setItem('favorites',JSON.stringify(updatedFav));
        //onToggleFavorite(idMeal); // Call onToggleFavorite after updating favorites
    };
*/
    console.log(favorites)

    useEffect(()=>{
       /* axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response)=>{

            if(response.status >= 200 && response.status < 300){
                console.log(response.data.meals)
                setData(response.data.meals);
                setError(null);   
                
            } else{
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
        }
    
        })
        .catch((error)=>{
            console.log('Error: ', error);
            setError(error.message);
            setData(null);
        })
        .finally(()=>{
            setLoading(false);
        });*/

        const fetchData = async() =>{
            try {
                const mealsData =  await fetchMeals(searchTerm);
                setData(mealsData);
                setError(null);

            }catch (error){
                console.error('Error fetching meals: ',error);
                setError(error.message);
                setData(null);

            } finally{
                setLoading(false);
            }
        };

        fetchData();

        //Load favorites from localStrage on component mount
        //const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
        //setFavoritesData(favoritesData);
    }, [searchTerm]);


  /*------the effect will run whenever the favorites state changes.---
    This ensures that the localStorage is updated with the latest value of favorites every time it changes.
    If there is not this useEffect the heart icon cannot directory change color (red OR no-color)
    It means when you go to other page and come back this page the localStrage is updated */
    useEffect(() => {
        setFavoritesData(favorites);
    }, [favorites]);

  return (
    <Container className='p-5'>
        {loading && <div>A moment please ...</div>}
        {error && (
            <div>{`There is a problem fetching the data -${error}`}</div>
        )}

        <Row className="justify-content-center">
         {data &&
         data.map(({idMeal, strMeal, strMealThumb})=>(
        
            <Col sm={data.length <= 1 ? 6 : 4} className= "mb-2" key ={idMeal}>

                
                <Card 
                    style={{width:'100%', height:'100%'}} 
                    key={idMeal}
                    
                >
                 <Link to ={`/meal-details/${idMeal}`} style={{textDecoration: 'none'}}>
                    <Card.Img variant="top" src={strMealThumb} />
                    <Card.Body>
                        <Card.Title>
                            {strMeal}
                        </Card.Title>
                    </Card.Body>
                </Link>

                    <div className="heart-icon mb-2"
                         onMouseEnter={()=> setHoveredMealId(idMeal)}  
                         onMouseLeave={()=> setHoveredMealId(null)} 
                         onClick={()=>toggleFavorite({idMeal, strMealThumb, strMeal}) }
                    >

                     {favoritesData.some((fav)=> fav.idMeal === idMeal) || hoveredMealId === idMeal? (
                        <FaHeart color='red' />
                     ):(
                        <FaRegHeart />
                     )}
                    </div>
                    
                </Card>
                
            
            </Col>
            
         ))
         }

        </Row>
    </Container>
  )
}

export default Meal