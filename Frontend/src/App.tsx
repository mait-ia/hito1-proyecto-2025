import { Outlet } from 'react-router-dom';

import { AppHeader } from './shared/components/AppHeader';
import { AppSidebar } from './shared/components/AppSidebar';

export function App() {
  return (
    <div className="min-h-screen bg-surface text-white">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 px-8 py-6">
          <AppHeader />
          <section className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

