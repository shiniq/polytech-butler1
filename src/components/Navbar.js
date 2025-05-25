import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-800/80 backdrop-blur rounded-b-lg sticky top-0 z-10">
      <h1 className="text-2xl font-bold">Политех<span className="text-accent">Батлер</span></h1>
      <div className="space-x-6">
        <NavLink to="/battle" className="hover:text-accent">Битва</NavLink>
        <NavLink to="/result" className="hover:text-accent">Результаты</NavLink>
      </div>
    </nav>
  );
}
