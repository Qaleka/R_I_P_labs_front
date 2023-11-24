import './App.css'
import { Routes, Route, Navigate  } from 'react-router-dom';

import { AllRecipients } from './pages/AllRecipients'
import { RecipientInfo } from './pages/RecipientInfo'

import { AllNotifications} from './pages/AllNotifications'
import NavigationBar from './components/NavBar';
import { useEffect, useState } from 'react';
import LoadAnimation from './components/LoadAnimation';

function App() {
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false);

  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function() {
        console.log(`${import.meta.env.BASE_URL}serviceWorker.js`)
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}serviceWorker.js`, { updateViaCache: 'none' })
        .then(() => {
          navigator.serviceWorker.ready.then(() => {
            console.log("service worker is ready");
            setServiceWorkerRegistered(true)
          })
        })
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })
  
  return (//вопрос
    <>
      <NavigationBar />
      {serviceWorkerRegistered ? (
      <div className='container-xl px-2 px-sm-3'>
      <Routes>
        <Route path="/" element={<Navigate to="recipients" />} />
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/notifications" element={<AllNotifications />} />
      </Routes>
      </div>
       ) : (
        <LoadAnimation />
      )}
    </>
  )
}

export default App
