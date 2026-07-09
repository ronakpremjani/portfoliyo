import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/layout';
import AppRoutes from '../routes/index';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
