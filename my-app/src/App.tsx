import './App.css'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Main, AllRecipients, RecipientsTable, RecipientInfo, RecipientEdit, AllNotifications, NotificationInfo, Authorization, Registration } from './pages'
import NavigationBar from './components/NavBar';

import { AppDispatch } from "./store";
import { setLogin, setRole } from "./store/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLogin(localStorage.getItem('login')));
    dispatch(setRole(localStorage.getItem('role')));
  }, [dispatch]);
  
  return (
    <div className='d-flex flex-column vh-100'>
      <div className='container-xl d-flex flex-column px-2 px-sm-3 flex-grow-1'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/recipients" element={<AllRecipients />} />
        <Route path="/recipients/edit" element={<RecipientsTable />} />
        <Route path="/recipients/:recipient_id" element={<RecipientInfo />} />
        <Route path="/recipients/edit/:recipient_id" element={<RecipientEdit />} />
        <Route path="/notifications" element={<AllNotifications />} />
        <Route path="/notifications/:notification_id" element={<NotificationInfo />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
      </div>
    </div>
  )
}

export default App
