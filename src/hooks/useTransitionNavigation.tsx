import { useNavigate } from 'react-router-dom';
import { usePageTransition } from '@/contexts/PageTransitionContext';

export const useTransitionNavigation = () => {
  const navigate = useNavigate();
  const { startTransition } = usePageTransition();

  const navigateWithTransition = async (
    path: string, 
    direction: 'left' | 'right' | 'up' | 'down' = 'up'
  ) => {
    await startTransition(direction);
    navigate(path);
  };

  const goBackWithTransition = async () => {
    await startTransition('down');
    navigate(-1);
  };

  return {
    navigateWithTransition,
    goBackWithTransition,
  };
};