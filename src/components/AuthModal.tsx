import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Key, X, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleFillTestAdmin = () => {
    setEmail('donieltripura121@gmail.com');
    setPassword('Qazxsw@121');
    setErrorMsg('');
  };

  const handleFillResearcher = () => {
    setEmail('ananya.chakma@cu.ac.bd');
    setPassword('ChakmaRes#2024');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-stone-900 dark:text-stone-100 transition-colors">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-900 dark:bg-amber-800 text-amber-200 mx-auto flex items-center justify-center mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
            Archivist & Researcher Access
          </h2>
          <p className="text-xs font-serif text-stone-600 dark:text-stone-400">
            Authenticate to decrypt sensitive customary land records and access the archival CMS.
          </p>
        </div>

        {/* Quick Test Login Buttons */}
        <div className="p-3.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl space-y-2 text-xs font-serif">
          <div className="flex items-center justify-between text-amber-950 dark:text-amber-200 font-bold">
            <span className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
              <span>Configured Test Credentials</span>
            </span>
            <span className="text-[10px] text-amber-900 dark:text-amber-300 bg-amber-200 dark:bg-amber-900 px-2 py-0.5 rounded-full font-bold">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-amber-900 dark:text-amber-300 leading-tight">
            Click below to auto-fill the test credentials requested in the brief:
          </p>
          <div className="flex flex-col gap-1.5 pt-1">
            <button
              type="button"
              onClick={handleFillTestAdmin}
              className="w-full text-left px-3 py-2 bg-white dark:bg-stone-800 hover:bg-amber-100/60 dark:hover:bg-amber-950/60 border border-amber-300 dark:border-amber-700 rounded-lg text-xs font-sans text-stone-900 dark:text-stone-100 flex items-center justify-between transition-colors cursor-pointer shadow-xs"
            >
              <span>Test Admin: <strong className="text-emerald-700 dark:text-emerald-400">donieltripura121@gmail.com</strong></span>
              <span className="text-amber-800 dark:text-amber-400 font-mono text-[11px] font-bold">Auto-Fill →</span>
            </button>
            <button
              type="button"
              onClick={handleFillResearcher}
              className="w-full text-left px-3 py-2 bg-white/70 dark:bg-stone-800/70 hover:bg-amber-100/60 dark:hover:bg-amber-950/60 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-sans text-stone-700 dark:text-stone-300 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Researcher: <strong>ananya.chakma@cu.ac.bd</strong></span>
              <span className="text-stone-500 dark:text-stone-400 font-mono text-[11px]">Auto-Fill →</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg text-xs font-serif text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-serif text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-serif">
          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
              Registered Archival Email
            </label>
            <input
              type="email"
              placeholder="e.g. donieltripura121@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-amber-600 dark:focus:border-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
              Password / Security Key
            </label>
            <input
              type="password"
              placeholder="e.g. Qazxsw@121"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 font-mono focus:outline-hidden focus:border-amber-600 dark:focus:border-amber-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-600 rounded-lg transition-colors cursor-pointer shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Verifying Archival Credentials...' : 'Authenticate & Open Repository'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] font-serif text-stone-500 dark:text-stone-400">
          Archival credentials protect sensitive customary land tenure and unratified border surveys in the Chittagong Hill Tracts.
        </div>
      </div>
    </div>
  );
};
