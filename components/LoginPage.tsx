import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-md">
      <div className="flex flex-col gap-lg w-full max-w-md">
        <div className="flex items-center justify-center gap-1 uppercase font-neuebit text-4xl font-bold">
          <span className="text-primary">DocuExtract</span>
          <span className="text-tertiary">AI</span>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-md p-lg bg-card-dark rounded-sm border border-tertiary/20">
          <h2 className="font-neue-montreal font-medium text-xl text-primary text-center">
            Log In to Your Account
          </h2>
          
          <div className="flex flex-col gap-xs">
            <label htmlFor="email" className="font-neue-montreal font-medium uppercase text-sm text-tertiary">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="bg-primary-dark/50 border border-tertiary/30 rounded-2xs p-2 text-primary font-neue-montreal focus:outline-none focus:ring-1 focus:ring-tertiary"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="password" className="font-neue-montreal font-medium uppercase text-sm text-tertiary">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="bg-primary-dark/50 border border-tertiary/30 rounded-2xs p-2 text-primary font-neue-montreal focus:outline-none focus:ring-1 focus:ring-tertiary"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-3xs shadow-sm font-neue-montreal font-medium text-sm transition-colors bg-tertiary/90 text-primary-darker hover:bg-tertiary h-9 px-4 py-2 mt-sm">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;