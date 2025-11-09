import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '../App';
import { AuditLogPlaceholder } from '../modules/audits/components/AuditLogPlaceholder';
import { InteractionTimelinePlaceholder } from '../modules/interactions/components/InteractionTimelinePlaceholder';
import { SessionWorkspacePlaceholder } from '../modules/sessions/components/SessionWorkspacePlaceholder';
import { DashboardScreen } from '../shared/components/DashboardScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardScreen />
      },
      {
        path: 'sessions',
        element: <SessionWorkspacePlaceholder />
      },
      {
        path: 'interactions',
        element: <InteractionTimelinePlaceholder />
      },
      {
        path: 'audits',
        element: <AuditLogPlaceholder />
      }
    ]
  }
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}

