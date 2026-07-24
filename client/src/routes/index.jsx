import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing';
import NotFound from '../pages/not_found';
import Work from '../pages/work';
import Journey from '../pages/journey';
import Expertise from '../pages/expertise';
import DevToolkit from '../pages/devtoolkit';
import ContactPage from '../pages/contact';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/work" element={<Work />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/expertise" element={<Expertise />} />
      <Route path="/devtoolkit" element={<DevToolkit />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
