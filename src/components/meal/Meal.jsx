import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Container } from 'react-bootstrap';

const Meal = ({searchTerm}) => {
    
    const [data, setData]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);

    useEffect(()=>{
        axios
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
        });
    }, [searchTerm]);



  return (
    <Container className='p-5'>
        {loading && <div>A mment please ...</div>}
        {error && (
            <div>{`There is a problem fetching the data -${error}`}</div>
        )}

        <Row>
         {data &&
         data.map(({idMeal, strMeal, strMealThumb})=>(
        
            <Col sm={4} className= "mb-2" key ={idMeal}>

                <Link to ={`/meal-details/${idMeal}`} style={{textDecoration: 'none'}}>
                <Card style={{width:'100%'}} key={idMeal}>
                    <Card.Img variant="top" src={strMealThumb} />
                    <Card.Body>
                        <Card.Title>
                            {strMeal}
                        </Card.Title>
                    </Card.Body>
                </Card>
                </Link>
            
            </Col>
            
         ))
         }

        </Row>
    </Container>
  )
}

export default Meal