import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-50 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-400 mb-6">Регистрация</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-pink-200 mb-1">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Введите имя"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-pink-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-pink-200 mb-1">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Введите пароль"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-center text-pink-300">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="underline hover:text-pink-500">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;