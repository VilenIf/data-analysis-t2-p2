// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import './App.css';
// src/index.js
import '@progress/kendo-theme-classic/dist/all.css';
import RawData from './pages/RawData';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/raw" element={<RawData />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;