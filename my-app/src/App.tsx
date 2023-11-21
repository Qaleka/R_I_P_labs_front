import './App.css'
import { Routes, Route, Navigate  } from 'react-router-dom';

import { AllRecipients } from './pages/AllRecipients'
import { RecipientInfo } from './pages/RecipientInfo'
import { NotImplemented } from './pages/NotImplemented'
import NavigationBar from './components/NavBar';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function() {
        console.log(`${import.meta.env.BASE_URL}serviceWorker.js`)
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}serviceWorker.js`)
        .then(() => {
          console.log("service worker registered");
        })
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })
  
  return (//вопрос
    <>
      <NavigationBar />
      <div className='container-xl px-2 px-sm-3'>
      <Routes>
        <Route path="/" element={<Navigate to="recipients" />} />
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/notifications" element={<NotImplemented />} />
      </Routes>
      </div>
    </>
  )
}

export default App
