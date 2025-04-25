import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the auth flow if the user isn't authenticated
  // For demo purposes, we'll redirect to the login screen
  return <Redirect href="/login" />;
}