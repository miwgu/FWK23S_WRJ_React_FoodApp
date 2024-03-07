import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { getMealById } from '../api/getMeals';


const MealDetails = () => {
   const {mealId} =useParams();
   const [mealDetails, setMealDetails] = useState(null);
   const [loading, setLoading]= useState(true);
   const [error, setError]= useState(null);

   useEffect(()=>{
    /*
       axios
       .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
       .then((response)=>{

        if(response.status >= 200 && response.status < 300){
            console.log(response.data.meals[0])
            setMealDetails(response.data.meals[0]);
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
    })*/

    const fetchData = async() =>{
      try{
        const mealDataById = await getMealById(mealId);
        setMealDetails(mealDataById);
        setError(null);

      } catch (error){
        console.error('Error fetching a meal by ID: ', error)
        setError(error.message);
        setMealDetails(null);

      } finally{
        setLoading(false);
      }
    } ;

    fetchData();

   },[mealId]);

  return (
    <Container className='m-4 p-3'>
      {loading && <div>Loading...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
      {mealDetails && (
    <Row className="justify-content-lg-center">
        <Col >
          <Image 
          src={mealDetails.strMealThumb} 
          rounded 
          className="img-fluid" 
          style={{ maxWidth: '3500px', maxHeight: '350px' }}  
          />
        </Col>
        
        <Col lg={10} >
          <h1>{mealDetails.strMeal}</h1>
          <p style={{ textAlign: 'left' }}>{mealDetails.strInstructions}</p>
          
          {mealDetails.strYoutube && (
            <div>
              <h4>Video</h4>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${mealDetails.strYoutube.slice(-11)}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          </Col>
        </Row>
     
      )}
    </Container>
  )
}

export default MealDetails