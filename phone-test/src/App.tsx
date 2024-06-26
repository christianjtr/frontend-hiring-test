import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login';
import { CallsListPage } from './pages/CallsList/CallsList';
import { CallDetailsPage } from './pages/CallDetails';
import { Tractor } from '@aircall/tractor';

import './App.css';
import { ProtectedLayout } from './components/routing/ProtectedLayout';
import { darkTheme } from './style/theme/darkTheme';
import { RouterProvider } from 'react-router-dom';
import { GlobalAppStyle } from './style/global';
import { ApolloProvider } from '@apollo/client';
import useApolloClient from './hooks/useApolloClient';
import { AuthProvider } from './hooks/useAuth';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/calls" element={<ProtectedLayout />}>
        <Route path="/calls" element={<CallsListPage />} />
        <Route path="/calls/:callId" element={<CallDetailsPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Route>
  )
);

function App() {
  const { apolloClient } = useApolloClient();

  if (!apolloClient) return null;

  return (
    <Tractor injectStyle theme={darkTheme}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
        <GlobalAppStyle />
      </ApolloProvider>
    </Tractor>
  );
}

export default App;
