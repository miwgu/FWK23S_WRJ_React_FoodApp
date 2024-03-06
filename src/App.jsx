import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import Meal_Page from './components/meal/Meal_Page';



function App() {

  return (
    <>
    <MyNav />
      <Routes>
        <Route path='/' element={<Meal_Page/>} />
      </Routes>

    </>
  )
}

export default App
