import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
