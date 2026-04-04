import React from 'react';
import { useMember } from '@/integrations';
import { LoadingSpinner } from './loading-spinner';
import { SignIn } from './sign-in';

interface MemberProtectedRouteProps {
  children: React.ReactNode;
  messageToSignIn?: string;
}

export function MemberProtectedRoute({ 
  children, 
  messageToSignIn = "Please sign in to access this page" 
}: MemberProtectedRouteProps) {
  const { member, isLoading } = useMember();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!member) {
    return <SignIn message={messageToSignIn} />;
  }

  return <>{children}</>;
}
