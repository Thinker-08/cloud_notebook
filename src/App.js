import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/navbar"
import Home from './components/home'
import About from './components/about'
import NoteState from './context/Notes/NoteState';
function App() {
  return (
    <div>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
