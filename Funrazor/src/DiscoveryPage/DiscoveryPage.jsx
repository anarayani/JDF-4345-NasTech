import './DiscoveryPage.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import AdminButton from './AdminButton/AdminButton';
import { useEffect } from 'react';

function DiscoveryPage() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // When the user is logged in and it's not loading, check if they're new
  useEffect(() => {
    if (isAuthenticated && !isLoading && user) {
      addUserToDatabase(user);
    }
  }, [isAuthenticated, isLoading, user]);

  const addUserToDatabase = async (user) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.name,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main >
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <AdminButton></AdminButton>
    </main>
  )
}

export default DiscoveryPage