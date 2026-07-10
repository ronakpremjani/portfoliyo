import React from 'react';
import { Text } from './typography';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center p-8 select-none" role="status" aria-label="Loading">
      <div className="flex items-center gap-3">
        <span className="inline-block h-5 w-5 border-2 border-t-transparent border-brand-primary rounded-full animate-spin" aria-hidden="true" />
        <Text variant="muted" className="text-sm">Loading...</Text>
      </div>
    </div>
  );
};

export default Loader;
