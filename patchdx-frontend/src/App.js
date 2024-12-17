import { RouterProvider } from 'react-router-dom'
import Routes from "./Routes";
import './App.css';
import axiosInterceptor from './redux/axios/axiosInterceptor'


function App() {
  return (
    <Routes />
  );
}

export default App;
