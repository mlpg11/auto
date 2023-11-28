import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Explorar from './components/Explorar';


function App() {
  return (
    <Router>
      <div className="App">
        <Explorar></Explorar>
      </div>
    </Router>
  );
}

export default App;
