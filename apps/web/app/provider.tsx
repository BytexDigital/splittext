'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/system';

const Providers = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
