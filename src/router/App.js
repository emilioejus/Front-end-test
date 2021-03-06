import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ListView from '../view/ListView';
import Details from '../view/Details';
import '../assets/App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<ListView />} />
          <Route exact path='/details/:id' element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
