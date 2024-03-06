import { useState } from 'react'
import './App.css'
import MyNav from './nav/Mynav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MyNav />
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>

    </>
  )
}

export default App
