'use client';
import { useState } from 'react';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <DashboardPage />;
}
