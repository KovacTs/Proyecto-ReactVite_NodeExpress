import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('No se pudo obtener el perfil.');
        }
        const data: UserProfile = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Perfil de Usuario</CardTitle>
      </CardHeader>
      <CardContent>
            {profile ? (
                <>
                <h1 className="text-3xl font-bold mb-4">Perfil de {profile.name}</h1>
                <p className="text-lg mb-6">Email: {profile.email}</p>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
            <Button onClick={handleLogout} variant="destructive">
                Cerrar Sesión
            </Button>
      </CardContent>
    </Card>
  );
};
