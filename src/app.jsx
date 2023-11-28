import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './app.css';
// eslint-disable-next-line import/no-unresolved
import Home from './pages/home';

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('demo_profile_data');
    if (!storedData) {
      const data = {
        username: 'Spike',
        email: 'spikedingo@gmail.com',
        mobile: 13855556666,
      };

      localStorage.setItem('demo_profile_data', JSON.stringify(data));
    }

    setDataLoaded(true);
  }, []);

  if (!dataLoaded) {
    return <div className="app">Data Loading</div>;
  }
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
