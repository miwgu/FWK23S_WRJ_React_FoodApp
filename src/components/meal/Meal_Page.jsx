import React from 'react'
import { Container } from 'react-bootstrap'
import Meal from './Meal'

const Meal_Page = ({searchTerm, favorites, setFavorites, toggleFavorite}) => {
  return (
    
    <Container>
        <Meal searchTerm={searchTerm} favorites={favorites}  toggleFavorite={toggleFavorite} />
    </Container>
    
  )
}

export default Meal_Page