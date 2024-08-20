import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import store from './store/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
      <ToastContainer limit={3} />
    </Provider>
  ,
);
