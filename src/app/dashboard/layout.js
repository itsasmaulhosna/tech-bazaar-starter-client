'use client';

import { authClient } from '@/lib/auth-client';
import Sidebar from '@/components/Dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>

          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />

              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
