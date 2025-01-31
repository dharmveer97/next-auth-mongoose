import { useSession } from 'next-auth/react';

export const useUserSession = () => {
  const session = useSession();
  const { data, status, update } = useSession();
  const user = data?.user || null;

  // Loading state when session is being fetched
  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';

  return { user, isLoggedIn, isLoading, session, update };
};