import React from 'react';
import { useMember } from '@/integrations';
import { Button } from './button';

interface SignInProps {
  message?: string;
}

export function SignIn({ message = "Please sign in to continue" }: SignInProps) {
  const { actions } = useMember();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">{message}</h1>
      <Button onClick={actions.login}>Sign In</Button>
    </div>
  );
}
