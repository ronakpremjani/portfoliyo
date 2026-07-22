import React, { createContext, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/layout';
import AppRoutes from '../routes/index';
import { useLenis } from '../hooks/useLenis';
import { Cursor } from '../components/ui/Cursor';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

export const LenisContext = createContext({ lenis: null, scrollTo: () => {} });

export const useLenisContext = () => useContext(LenisContext);

export const App = () => {
  const { lenis, scrollTo } = useLenis();

  return (
    <ErrorBoundary>
      <LenisContext.Provider value={{ lenis, scrollTo }}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Cursor />
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </LenisContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
