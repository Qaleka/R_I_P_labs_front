import './App.css'
import { Routes, Route } from 'react-router-dom';

import { AllRecipients } from './pages/AllRecipients'
import { RecipientInfo } from './pages/RecipientInfo'
import { NotImplemented } from './pages/NotImplemented'
import NavigationBar from './components/NavBar';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/notifications" element={<NotImplemented />} />
      </Routes>
    </>
  )
}

export default App
