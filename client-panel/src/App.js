import logo from './logo.svg';
import './App.css';
import Header from './header';
import Slider from './slider';
import Movie from './Movie';
import { Routes, Route, Link } from "react-router-dom";
import Language from './Language';
import Sports from './Sports';
import Register from './Register';
import Login from './login';
import Account from './Account';
import Pricing from './Pricing';
import Login_register from'./login_register';
import Subscribe from './Subscribe';


function App() {
  return (
    <>
    {/* <Slider/> */}
    <Routes>
        <Route path="Slider" element={<Slider/>} />
        <Route path="Movie/:id" element={<Movie/>} />
        <Route path="Language" element={<Language/>} />
        <Route path="Sports" element={<Sports/>} />
        {/* <Route path="Register" element={<Register/>} /> */}
        <Route path="Account" element={<Account/>} />
        <Route path="/" element={<Login_register/>} />
        <Route path="/Pricing" element={<Pricing/>} />
        <Route path="/Subscribe" element={<Subscribe/>} />
      </Routes>
   
       {/* <Movie/> */}
    </>
  );
}

export default App;
