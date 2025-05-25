// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MatchProvider } from './context/MatchContext';
import Navbar from './components/Navbar';
import BattlePage from './pages/BattlePage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <MatchProvider>
      <div
        className="min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/images/bg.png')",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backgroundBlendMode: "overlay",
        }}
      >
        <Navbar />
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/battle" replace />} />
            <Route path="/battle" element={<BattlePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </MatchProvider>
  );
}

export default App;
