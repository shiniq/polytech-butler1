import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMatch } from '../context/MatchContext';
import BetOptions from '../components/BetOptions';
import Loader from '../components/Loader';
import { simulateMatch } from '../api/matchApi';

export default function BetPage() {
  const nav = useNavigate();
  const { state: { match } } = useLocation();
  const { setCurrentMatch, placedBets, setPlacedBets, setResult } = useMatch();
  const [loading, setLoading] = useState(false);

  // инициализация
  React.useEffect(() => {
    setCurrentMatch(match);
    setPlacedBets(match.Bets.map(b => ({ ...b, Amount: 0 })));
  }, [match]);

  const handleBetChange = (i, amount) => {
    const next = [...placedBets];
    next[i].Amount = amount;
    setPlacedBets(next);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await simulateMatch(match, placedBets);
    setResult(res);
    setLoading(false);
    nav('/result');
  };

  if (!match) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ставки на матч #{match.id}</h1>
      <BetOptions bets={placedBets} onChange={handleBetChange} />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-accent rounded-lg hover:opacity-80 transition disabled:opacity-50"
      >
        {loading ? 'Симуляция...' : 'Поставить и симулировать'}
      </button>
    </div>
  );
}
