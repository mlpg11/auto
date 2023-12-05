import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Explorar from './components/Explorar';
import MeusTokens from './components/MeusTokens';
import NotFound from './components/NotFound';
import Simular from './components/Simular';
import Transparencia from './components/Transparencia';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Explorar/>}/>
            <Route exact path="/explorar" element={<Explorar/>}/>
            <Route exact path="/meus-tokens" element={<MeusTokens/>} />
            <Route exact path="/simular" element={<Simular/>} />
            <Route exact path="/transparencia" element={<Transparencia/>} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
