import firebase from 'firebase/compat/app';
import React from 'react';
import { useEffect, useState } from 'react';

import { auth } from '../../configs/firebase/firebase-config';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
