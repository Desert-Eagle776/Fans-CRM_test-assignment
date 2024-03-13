import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FindUser from './components/FindUser';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/api/v1/add-user' element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/api/v1/get-user/:id' element={<FindUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
