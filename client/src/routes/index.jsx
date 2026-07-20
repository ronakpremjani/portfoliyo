import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import NotFound from '../pages/not_found';
import Work from '../pages/work';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/work" element={<Work />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
