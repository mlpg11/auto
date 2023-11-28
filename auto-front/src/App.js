import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explorar from './components/Explorar';
import MeusTokens from './components/MeusTokens';
import NotFound from './components/NotFound';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Explorar/>}/>
          <Route exact path="/explorar" element={<Explorar/>}/>
          <Route exact path="/meus-tokens" element={<MeusTokens/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
