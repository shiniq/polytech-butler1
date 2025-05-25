// src/pages/ResultPage.js
import React from 'react';
import { useMatch } from '../context/MatchContext';
import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const { lastResult } = useMatch();
  const nav = useNavigate();

  if (!lastResult) {
    return (
      <div className="p-6 text-white">
        <p>
          Пока нет результата.{' '}
          <button className="text-accent underline" onClick={() => nav('/battle')}>
            К битве
          </button>
        </p>
      </div>
    );
  }

  const isLost = lastResult.TotalWin <= 0;

return (
  <div className="p-6 space-y-4 text-white">
    <h2 className="text-2xl font-bold">Результаты последней битвы</h2>
    <p>Выигрыш: {lastResult.TotalWin}</p>
    <p>Новый баланс: {lastResult.NewBalance}</p>

<div className="mt-4 space-y-2">
  <h3 className="text-lg font-semibold">Статистика героев:</h3>
  <p>🛡 {lastResult.HeroStats?.Hero1.Name} — Удары: {lastResult.HeroStats?.Hero1.Hits}, Уклонения: {lastResult.HeroStats?.Hero1.Dodges}</p>
  <p>⚔ {lastResult.HeroStats?.Hero2.Name} — Удары: {lastResult.HeroStats?.Hero2.Hits}, Уклонения: {lastResult.HeroStats?.Hero2.Dodges}</p>
</div>


    <button
      className="mt-4 px-4 py-2 bg-accent rounded hover:opacity-80"
      onClick={() => nav('/battle')}
    >
      Новая битва
    </button>
  </div>
);

}
