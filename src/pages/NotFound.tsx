import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-4xl place-items-center px-4 py-14">
      <div className="absolute inset-0 animated-gradient opacity-[0.07]" />
      <div className="relative text-center">
        <p className="font-display text-[8rem] font-extrabold leading-none text-brand-600 sm:text-[10rem]">404</p>
        <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
          This page has gone off the grid.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/"><Button><Home className="h-4 w-4" /> Go home</Button></Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
        </div>
      </div>
    </div>
  );
}
