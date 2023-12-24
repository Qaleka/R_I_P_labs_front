
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";


// document.body.style.height = '100vh';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
      <App />
      </BrowserRouter>
      </Provider>
);