import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import ratingData from './ratingData.json'; 
import { FaSolarPanel } from 'react-icons/fa';


const Meal_Rating = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [newRating, setNewRating] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        setMeals(ratingData.map(meal =>({
        ...meal,
        averageRating: calculateAvgRating(meal.ratings)
        })));
    },[]);

    const calculateAvgRating = (ratings) =>{
        if(!ratings || ratings.length ===0) 
        return 0;
        const sum = ratings.reduce((total, rating)=> total + rating, 0);
        return sum / ratings.length;

    };

    const handleRatingChange = (id, newRating) => {
        setSelectedMeal(id);
        setNewRating(newRating);
        setShowModal(true);
    };

    const handleModalClose =() =>{
        setShowModal(false);
        const updatedMeals = meals.map(meal=>
            meal.id=== selectedMeal
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

    return (
        <div>
            <h1>Meals</h1>
            {meals.map(meal => (
                <div key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>Average Rating: {meal.averageRating.toFixed(1)} stars</p>
                    <button onClick={()=> handleRatingChange(meal.id)}>Add Ratig</button>
                </div>
            ))}
          <Modal show ={showModal} onHide={handleModalClose} >
             <Modal.Header closeButton>
               <Modal.Title>Add Rating </Modal.Title>
             </Modal.Header>
             <Modal.Body>
               {/* Render rating starts*/}
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
        </div>
    );
};


export default Meal_Rating