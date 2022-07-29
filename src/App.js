import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Trending from './Components/Trending';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Favourites from './Components/Favourites';
function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<><Banner/><Trending/></>}></Route>
      <Route path='/Favourites' element={<><Favourites/></>}></Route> 
      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
