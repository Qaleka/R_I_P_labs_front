import './App.css'
import { Routes, Route, Navigate  } from 'react-router-dom';

import { AllRecipients } from './pages/AllRecipients'
import { RecipientInfo } from './pages/RecipientInfo'

import { AllNotifications} from './pages/AllNotifications'
import NavigationBar from './components/NavBar';


function App() {
  
  
  return (//вопрос
    <>
      <div className='container-xl px-2 px-sm-3'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="recipients" />} />
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/notifications" element={<AllNotifications />} />
      </Routes>
      </div>
    </>
  )
}

export default App
