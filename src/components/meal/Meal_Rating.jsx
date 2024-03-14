import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Button, Modal, Container, Card, Row, Col } from 'react-bootstrap';
import ratingData from './ratingData.json'; 
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";



const Meal_Rating = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [newRating, setNewRating] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [hoveredMeal, setHoveredMeal] = useState(null);

    useEffect(()=>{
        setMeals(ratingData.map(meal =>({
        ...meal,
        averageRating: calculateAvgRating(meal.ratings)
        })));

        console.log("Rating",ratingData);
    },[]);

    const calculateAvgRating = (ratings) =>{
        if(!ratings || ratings.length ===0) 
        return 0;
        const sum = ratings.reduce((total, rating)=> total + rating, 0);
        return sum / ratings.length;

    };

    const handleAverageRatingHover = (id) => {
        setHoveredMeal(id);
    };

    const handleAverageRatingLeave = () => {
        setHoveredMeal(false);
    };

    const handleRatingChange = (meal, newRating) => {
        setSelectedMeal(meal);
        if(newRating==null){
            setNewRating(0);
        }else{
            setNewRating(newRating);
        }
       
        setShowModal(true);
    };

    const handleModalClose =() =>{
        setShowModal(false);
        const updatedMeals = meals.map(meal=>
            meal.idMeal=== selectedMeal.idMeal
              ?{
                ... meal,
                ratings :[...meal.ratings, newRating],
                averageRating: calculateAvgRating([...meal.ratings, newRating])
              }
              : meal
            );
            setMeals(updatedMeals);
            setSelectedMeal(null);
            setNewRating(0);
    };

    const renderStars =(averageRating) =>{
       //How many several stars showld be there
       const fullStars = Math.floor(averageRating);
       const halfStar = averageRating - fullStars >= 0.5 ? 1: 0;
       const emptyStars = 5 - fullStars -halfStar;

       const starts =[];

       for(let i= 0; i < fullStars; i++ ){
           starts.push(<FaStar key={i} color='gold' />);
       }

       if (halfStar === 1){
          starts.push(<FaStarHalfAlt key="half" color='gold' />);
       }

       for(let i =0; i< emptyStars; i++){
          starts.push(<FaRegStar key={`empty-${i}`} color='gold' />)
       }
       return starts;
    }

    const renderModalContent = (meal) => {
        const { idMeal, strMeal, averageRating, ratings } = meal;
    
        return (
            <div key={idMeal}>
                <h3>{strMeal}</h3>
                <p>
                    {renderStars(averageRating)}
                    {averageRating.toFixed(1)}
                    {" ("}
                    {ratings.length}
                    {" reviews)"}
                </p>
            </div>
        );
    };

    return (
        <Container className='m-4 p-3'>
            <h3>Our meals with ratings</h3>
        
          <Row >
            
            {meals.map(meal => (
             <Col md="auto">
                <Card>
                 <div key={meal.idMeal}>
                 <Link to ={`/meal-details/${meal.idMeal}`} style={{textDecoration: 'none'}}>
                    <Card.Img
                     variant="top"
                     src={meal.strMealThumb}
                     rounded ='true'
                     className='img-fluid'
                     style={{ maxWidth: '3500px', maxHeight: '350px' }}  
                      />
                  
                  </Link>
                    <Card.Body>
                      <Card.Title>{meal.strMeal}</Card.Title>
                        <Card.Text  
                                onMouseEnter={()=>handleAverageRatingHover(meal.idMeal)}
                                onMouseLeave={handleAverageRatingLeave}
                                onClick={() => handleRatingChange(meal)}>
                                {hoveredMeal=== meal.idMeal ? 'Add Rating!' : 
                                (
                                    <>
                                        {renderStars(meal.averageRating)}
                                        {meal.averageRating.toFixed(1)}
                                        {" ("}
                                        {meal.ratings.length}
                                        {"reviews )"}
                                    </>
                        )}
                        </Card.Text>
                    </Card.Body>
                  
                 </div>
                
                </Card>
             </Col>
                
                
            ))}
            </Row>

          <Modal show ={showModal} onHide={handleModalClose} >
             <Modal.Header closeButton>
               <Modal.Title>Add Rating </Modal.Title>
             </Modal.Header>
             <Modal.Body>
             {selectedMeal ? (
                    renderModalContent(selectedMeal)
                ) : (
                    <p>No meal selected</p>
                )}
               
            
               {/* Render rating starts*/}
               <hr/>
               <p>Here, you can add rating!</p>
               {[1,2,3,4,5].map(star=>(
                <span
                    key={star}
                    style={{cursor: 'pointer', color: star <= newRating ? 'gold':'gray'}}
                    onClick={() => setNewRating(star)}

                >
                    ★
                </span>
               ))}
            
             </Modal.Body>
             <Modal.Footer>
                <Button variant = "secondary" onClick={handleModalClose} >
                    Save
                </Button>
             </Modal.Footer>
          </Modal>
        </Container>
    );
};


export default Meal_Rating