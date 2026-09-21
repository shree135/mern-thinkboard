import React from 'react'
import {Route,Routes} from "react-router"
import HomePage from "./pages/Homepage"
import Createpage from './pages/Createpage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast' //for toast notifications

const App = () => {
  return (
    <div data-theme="forest">
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/create" element={<Createpage/>}/>
      <Route path="/note/:id" element={<NoteDetailPage/>}/>
     </Routes>
    </div>
  )
}

export default App
