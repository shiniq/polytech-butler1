import React from 'react';
import StatBar from './StatBar';
import EquipmentSlots from './EquipmentSlots';
import { itemDetails } from '../api/matchApi';

export default function HeroBattleCard({ hero, items, borderColor }) {
  const bonuses = items.reduce(
    (acc, item) => {
      if (item && itemDetails[item]) {
        acc.Damage += itemDetails[item].bonuses.Damage;
        acc.Mana += itemDetails[item].bonuses.Mana;
        acc.Evasion += itemDetails[item].bonuses.Evasion;
      }
      return acc;
    },
    { Damage: 0, Mana: 0, Evasion: 0 }
  );

  const totalDamage = hero.BaseDamage + bonuses.Damage;
  const totalMana = hero.Mana + bonuses.Mana;
  const totalEvasion = hero.Evasion + bonuses.Evasion;

  return (
    <div className={`p-4 bg-white/5 rounded-lg border-2 ${borderColor} max-w-xs`}>
      <img
        src={`/images/heroes/${hero.name}.png`}
        alt={hero.name}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold text-center mb-2">{hero.name}</h2>

      <div className="text-sm space-y-1 mb-4">
        <p>
          Damage: {hero.BaseDamage}
          {bonuses.Damage > 0 && (
            <span className="text-green-400"> (+{bonuses.Damage})</span>
          )}
          = <strong>{totalDamage}</strong>
        </p>
        <p>
          Evasion: {hero.Evasion}%
          {bonuses.Evasion > 0 && (
            <span className="text-green-400"> (+{bonuses.Evasion}%)</span>
          )}
          = <strong>{totalEvasion}%</strong>
        </p>
      </div>

      <StatBar label="HP" current={hero.HP} max={hero.HP} color="bg-red-600" />
      <StatBar label="MP" current={totalMana} max={totalMana} color="bg-blue-500" />

      <EquipmentSlots items={items} itemDetails={itemDetails} />
    </div>
  );
}
