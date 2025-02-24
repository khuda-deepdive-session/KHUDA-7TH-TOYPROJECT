//src/routes/auth/profile.tsx
import React from 'react';
import { UserProfileForm } from '@/components/auth/UserProfileForm';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth();

  if (!currentUser) {
    return null;
  }

  return <UserProfileForm initialData={currentUser} onSubmit={updateUserProfile} />;
};

export default Profile;