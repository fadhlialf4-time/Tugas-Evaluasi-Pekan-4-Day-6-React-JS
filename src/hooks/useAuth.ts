import { useAuth } from '../contexts/AuthContext';

export const useAuthHook = () => {
  const auth = useAuth();
  
  const isAdmin = () => {
    return auth.user?.isAdmin || false;
  };
  
  return {
    ...auth,
    isAdmin: isAdmin(),
  };
};