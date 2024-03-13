import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import ratingData from './ratingData.json'; 
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


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
        if(newRating==null){
            setNewRating(0);
        }else{setNewRating(newRating);
        }
       
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

    return (
        <div>
            <h1>Meals</h1>
            {meals.map(meal => (
                <div key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>{renderStars(meal.averageRating)}{" "}{meal.averageRating.toFixed(1)}</p>
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