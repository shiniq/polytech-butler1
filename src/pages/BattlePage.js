import React, { useEffect, useState } from 'react';
import { useMatch } from '../context/MatchContext';
import { fetchMatch, simulateMatch } from '../api/matchApi';
import HeroBattleCard from '../components/HeroBattleCard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function BattlePage() {
  const [match, setMatch] = useState(null);
  const [bets, setBets] = useState({
    winner: { Hero1: 0, Hero2: 0 },
    evasion: { Hero1: 0, Hero2: 0 },
    hits: { Hero1: 0, Hero2: 0 },
  });
  const [busy, setBusy] = useState(false);
  const { setLastResult } = useMatch();
  const navigate = useNavigate();

  const loadMatch = async () => {
    setBusy(true);
    const m = await fetchMatch();
    setMatch(m);
    setBets({
      winner: { Hero1: 0, Hero2: 0 },
      evasion: { Hero1: 0, Hero2: 0 },
      hits: { Hero1: 0, Hero2: 0 },
    });
    setBusy(false);
  };

  useEffect(() => {
    loadMatch();
  }, []);

  if (!match) {
    return <div className="p-10 text-center">Загрузка матча…</div>;
  }

  const coef1 = match.Bets.find(b => b.Option === 'Hero1').Coefficient;
  const coef2 = match.Bets.find(b => b.Option === 'Hero2').Coefficient;

  const onFight = async () => {
    const placed = [];

    ['winner', 'evasion', 'hits'].forEach(type => {
      if (bets[type].Hero1 > 0) {
        placed.push({
          BetType: type,
          Option: 'Hero1',
          Coefficient: 1.5,
          Amount: bets[type].Hero1,
        });
      }
      if (bets[type].Hero2 > 0) {
        placed.push({
          BetType: type,
          Option: 'Hero2',
          Coefficient: 1.5,
          Amount: bets[type].Hero2,
        });
      }
    });

    if (placed.length === 0) {
      toast.error('Сделайте хотя бы одну ставку');
      return;
    }

    setBusy(true);
    const result = await simulateMatch(match, placed);
    setLastResult(result);
    navigate('/result');
  };

  const renderBetInputs = (heroKey, borderColor) => (
    <div className="flex flex-col items-center">
      <HeroBattleCard
        hero={{ name: match[heroKey].Name, ...match[heroKey] }}
        items={match[`${heroKey}Items`].map(i => i || null)}
        borderColor={borderColor}
      />

      <div className="mt-4 w-60 bg-white/10 border border-zinc-700 rounded-lg p-4 space-y-4">
        {['winner', 'evasion', 'hits'].map(type => (
          <div key={type}>
            <h3 className="font-semibold capitalize">
              {type === 'winner' ? 'Исход матча' : type === 'evasion' ? 'Уклонения' : 'Количество ударов'}
            </h3>
            <input
              type="number"
              min="0"
              placeholder={`Ставка на ${heroKey === 'Hero1' ? 'П1' : 'П2'}`}
              className="w-full px-2 py-1 bg-zinc-800 rounded text-white"
              value={bets[type][heroKey]}
              onChange={e =>
                setBets(prev => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    [heroKey]: Number(e.target.value),
                  },
                }))
              }
              disabled={busy}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">ПолитехБатлер: Битва</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {renderBetInputs('Hero1', 'border-blue-500')}

        <button
          onClick={onFight}
          disabled={busy}
          className="px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:opacity-80 transition disabled:opacity-50"
        >
          {busy ? 'Сражение…' : 'В бой!'}
        </button>

        {renderBetInputs('Hero2', 'border-red-500')}
      </div>
    </div>
  );
}
