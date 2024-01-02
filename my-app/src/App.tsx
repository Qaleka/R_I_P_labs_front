import './App.css'
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AllRecipients, RecipientsTable, RecipientInfo, RecipientEdit, AllNotifications, NotificationInfo, Authorization, Registration } from './pages'
import NavigationBar from './components/NavBar';

import { AppDispatch } from "./store";
import { setLogin, setRole } from "./store/userSlice";
import AuthCheck, { CUSTOMER, MODERATOR } from './components/AuthCheck'

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const login = localStorage.getItem('login');
    const role = localStorage.getItem('role');
    if (login && role) {
      dispatch(setLogin(login));
      dispatch(setRole(parseInt(role)));
    }
  }, [dispatch]);
  
  return (
    <div className='d-flex flex-column vh-100'>
      <div className='container-xl d-flex flex-column px-2 px-sm-3 flex-grow-1'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Navigate to="/recipients" />} />
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/edit" element={<AuthCheck allowedRoles={[MODERATOR]}><RecipientsTable /></AuthCheck>} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/recipients/edit/:recipient_id" element={<AuthCheck allowedRoles={[MODERATOR]}><RecipientEdit /></AuthCheck>} />
        <Route path="/notifications" element={<AuthCheck allowedRoles={[CUSTOMER, MODERATOR]}><AllNotifications /></AuthCheck>} />
        <Route path="/notifications/:notification_id" element={<AuthCheck allowedRoles={[CUSTOMER, MODERATOR]}><NotificationInfo /></AuthCheck>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
