import React from 'react';

export default function EquipmentSlots({ items, itemDetails }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {items.map((it, i) =>
        it ? (
          <div key={i} className="relative group">
            <img
              src={`/images/items/${it}.png`}
              alt={it}
              className="w-12 h-12 object-contain border border-zinc-700 rounded"
            />
            <div className="absolute z-10 hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 text-xs bg-black text-white rounded shadow-lg">
              <strong>{itemDetails[it]?.name}</strong><br />
              {itemDetails[it]?.description}<br />
              <div className="mt-1 text-zinc-300">
                +{itemDetails[it]?.bonuses.Damage} урона<br />
                +{itemDetails[it]?.bonuses.Mana} маны<br />
                +{itemDetails[it]?.bonuses.Evasion}% уклонения
              </div>
            </div>
          </div>
        ) : (
          <div
            key={i}
            className="w-12 h-12 border-2 border-dashed border-zinc-700 rounded"
          />
        )
      )}
    </div>
  );
}
