import './App.css'
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import { Main, AllRecipients, RecipientsTable, RecipientInfo, RecipientEdit, AllNotifications, NotificationInfo, Authorization, Registration } from './pages'

function App() {
  
  
  return (//вопрос
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
