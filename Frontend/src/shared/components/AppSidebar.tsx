import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Panel general' },
  { to: '/sessions', label: 'Sesiones' },
  { to: '/interactions', label: 'Interacciones' },
  { to: '/audits', label: 'Auditoría' }
];

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-white/10 bg-white/5 px-4 py-8 md:block">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wide text-white/60">
          Navegación
        </span>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              [
                'rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-white/80 hover:bg-white/10'
              ].join(' ')
            }
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

