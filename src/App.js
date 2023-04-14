import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VenuesListPage from './pages/VenuesListPage';



function App() {
  return (
    <div className="App">
   <Navbar />

   <Routes>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/venues" element={ <VenuesListPage /> } />
    <Route path="login" element={ <LoginPage /> } />
    <Route path="register" element={ <RegisterPage /> } />
   </Routes>
    </div>
  );
}

export default App;
