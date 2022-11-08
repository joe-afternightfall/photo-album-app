import firebase from 'firebase/compat/app';
import React from 'react';

export const AuthContext = React.createContext<firebase.User | null>(null);
