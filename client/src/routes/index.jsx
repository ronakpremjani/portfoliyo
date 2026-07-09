import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import NotFound from '../pages/not_found';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
