import './App.css';
import Players from './players/Players';
import { Routes, Route } from "react-router-dom";
import LoginForm from "./login/LoginForm";
import HomePage from "./homePage/HomePage";

function App() {
  return (
    <div className="App">
      <header>
      <main>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/players" element={<Players />} />
      </Routes>
      </main>
  
      </header>
    </div>
  );
}

export default App;
