import React, { useEffect, useState } from 'react';
import { fetchMatches, simulateMatch } from '../api/matchApi';
import StatBar from '../components/StatBar';
import EquipmentSlots from '../components/EquipmentSlots';
import toast from 'react-hot-toast';

export default function MatchPage() {
  const [match, setMatch] = useState(null);
  const [bets, setBets] = useState({ Hero1: 0, Hero2: 0 });
  const [loading, setLoading] = useState(false);

  // подгрузка матча
  const loadMatch = async () => {
    setLoading(true);
    const m = await fetchMatches();    // возвращает один MatchDto
    setMatch(m);
    setBets({ Hero1: 0, Hero2: 0 });  // сброс ставок
    setLoading(false);
  };

  useEffect(() => {
    loadMatch();
  }, []);

  if (loading || !match) {
    return <div className="text-center p-10 text-white">Загрузка матча…</div>;
  }

  // коэффициенты победы двух героев
  const winnerBets = match.Bets.filter(b => b.BetType === 'winner');
  const coef1 = winnerBets.find(b => b.Option === 'Hero1')?.Coefficient ?? 0;
  const coef2 = winnerBets.find(b => b.Option === 'Hero2')?.Coefficient ?? 0;

  // обработка нажатия «В бой!»
  const onFight = async () => {
    if (bets.Hero1 <= 0 && bets.Hero2 <= 0) {
      toast.error('Сделайте ставку хотя бы на одного героя');
      return;
    }

    setLoading(true);
    // подготавливаем placedBets
    const placed = [];
    if (bets.Hero1 > 0) placed.push({
      BetType: 'winner',
      Option: 'Hero1',
      Coefficient: coef1,
      Amount: bets.Hero1
    });
    if (bets.Hero2 > 0) placed.push({
      BetType: 'winner',
      Option: 'Hero2',
      Coefficient: coef2,
      Amount: bets.Hero2
    });

    const result = await simulateMatch(match, placed);
    toast.success(`Выигрыш: ${result.TotalWin}. Баланс: ${result.NewBalance}`);
    await loadMatch();
  };

  const hero1 = match.Hero1;
  const hero2 = match.Hero2;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">ПолитехБатлер: Матч</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Карточка Героя 1 */}
        <div className="flex flex-col items-center">
          <div className="border-2 border-blue-500 rounded-lg p-4 bg-white/5">
            <img
              src={`/images/heroes/${hero1.Name}.png`}
              alt={hero1.Name}
              className="w-40 h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{hero1.Name}</h2>
            <div className="text-sm space-y-1 mb-4">
              <p>Damage: {hero1.BaseDamage}</p>
              <p>Evasion: {hero1.Evasion}%</p>
              <p>Health: {hero1.HP}</p>
              <p>Mana: {hero1.Mana}</p>
            </div>
            <StatBar label="HP" current={hero1.HP} max={hero1.HP} color="bg-red-600" />
            <StatBar label="MP" current={hero1.Mana} max={hero1.Mana} color="bg-blue-500" />
            <EquipmentSlots items={match.Hero1Items.map(i => i?.Name)} />
          </div>

          {/* Блок ставок под героем 1 */}
          <div className="mt-4 w-60 bg-white/10 border border-zinc-700 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Исход матча</h3>
            <div className="flex">
              <div className="flex-1 text-center p-2 bg-zinc-800 rounded-l-lg cursor-pointer">
                <div className="text-sm">П1</div>
                <div className="text-lg font-bold">{coef1.toFixed(2)}</div>
              </div>
              <div className="flex-1 text-center p-2 bg-zinc-800 rounded-r-lg cursor-pointer">
                <div className="text-sm">П2</div>
                <div className="text-lg font-bold">{coef2.toFixed(2)}</div>
              </div>
            </div>
            <input
              type="number"
              min="0"
              value={bets.Hero1}
              onChange={e => setBets(b => ({ ...b, Hero1: Number(e.target.value) }))}
              placeholder="Ставка П1"
              className="w-full px-2 py-1 bg-zinc-800 rounded text-white"
            />
          </div>
        </div>

        {/* Кнопка «В бой!» */}
        <button
          onClick={onFight}
          disabled={loading}
          className="px-8 py-4 bg-accent text-black font-semibold rounded-lg hover:opacity-80 transition disabled:opacity-50"
        >
          {loading ? 'Сражение…' : 'В бой!'}
        </button>

        <div className="flex flex-col items-center">
          <div className="border-2 border-red-500 rounded-lg p-4 bg-white/5">
            <img
              src={`/images/heroes/${hero2.Name}.png`}
              alt={hero2.Name}
              className="w-40 h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{hero2.Name}</h2>
            <div className="text-sm space-y-1 mb-4">
              <p>Damage: {hero2.BaseDamage}</p>
              <p>Evasion: {hero2.Evasion}%</p>
              <p>Health: {hero2.HP}</p>
              <p>Mana: {hero2.Mana}</p>
            </div>
            <StatBar label="HP" current={hero2.HP} max={hero2.HP} color="bg-red-600" />
            <StatBar label="MP" current={hero2.Mana} max={hero2.Mana} color="bg-blue-500" />
            <EquipmentSlots items={match.Hero2Items.map(i => i?.Name)} />
          </div>

          <div className="mt-4 w-60 bg-white/10 border border-zinc-700 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Исход матча</h3>
            <div className="flex">
              <div className="flex-1 text-center p-2 bg-zinc-800 rounded-l-lg cursor-pointer">
                <div className="text-sm">П1</div>
                <div className="text-lg font-bold">{coef1.toFixed(2)}</div>
              </div>
              <div className="flex-1 text-center p-2 bg-zinc-800 rounded-r-lg cursor-pointer">
                <div className="text-sm">П2</div>
                <div className="text-lg font-bold">{coef2.toFixed(2)}</div>
              </div>
            </div>
            <input
              type="number"
              min="0"
              value={bets.Hero2}
              onChange={e => setBets(b => ({ ...b, Hero2: Number(e.target.value) }))}
              placeholder="Ставка П2"
              className="w-full px-2 py-1 bg-zinc-800 rounded text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
