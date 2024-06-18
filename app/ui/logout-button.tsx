// logout-button.tsx
'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/app/ui/button';

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: '/login' })}>
      Log out
    </Button>
  );
}
