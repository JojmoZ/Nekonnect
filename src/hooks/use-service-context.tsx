import { ServiceContext } from '@/context/service-context';
import { useContext } from 'react';

export default function useServiceContext() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('Cannot use service context outside service provider');
  }
  return context;
}
