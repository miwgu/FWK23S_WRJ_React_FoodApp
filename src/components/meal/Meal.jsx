import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Container } from 'react-bootstrap';
import { fetchMeals } from '../api/getMeals';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const Meal = ({searchTerm}) => {
    
    const [data, setData]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    const [favorites, setFavorites] = useState([]);
    const [hoveredMealId, setHoveredMealId] = useState(null);

    const toggleFavorite = (idMeal) =>{

     const updatedFav = favorites.includes(idMeal)
           ?  favorites.filter((favId)=>favId !== idMeal)
           : [...favorites, idMeal];
        setFavorites(updatedFav); 
        localStorage.setItem('favorites',JSON.stringify(updatedFav));
    };
    console.log("Favorites: ",favorites)
    

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

    }, [searchTerm]);



    const handleCardClick = (e, idMeal) =>{
        if(!e.target.closest('.heart-icon')){
            // Prevent default navigation behavior
            e.preventDefault();
          window.location.href=`/meal-details/${idMeal}`;
        }

    }

  return (
    <Container className='p-5'>
        {loading && <div>A moment please ...</div>}
        {error && (
            <div>{`There is a problem fetching the data -${error}`}</div>
        )}

        <Row>
         {data &&
         data.map(({idMeal, strMeal, strMealThumb})=>(
        
            <Col sm={4} className= "mb-2" key ={idMeal}>

                
                <Card 
                    style={{width:'100%'}} 
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

                    <div className="heart-icon"
                         onMouseEnter={()=> setHoveredMealId(idMeal)}  
                         onMouseLeave={()=> setHoveredMealId(null)} 
                         onClick={()=>toggleFavorite(idMeal) }
                    >

                     {favorites.includes(idMeal) || hoveredMealId === idMeal? (
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