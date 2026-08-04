"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";




export default function Sidebar() {
    const { data: session } = authClient.useSession();
      const user = session?.user;
      const role=user?.role || 'seller';
      
      console.log("user role",role)
      const navmenu={
    seller:[
        {
            title:"Overview",
            href:"/dashboard/seller"
        },
        {
            title:"Products",
            href:"/dashboard/seller/products"
        },
        {
            title:"Orders",
            href:"/dashboard/seller/orders"
        },
        {
            title:"Analytics",
            href:"/dashboard/seller/analytics"
        }
    ],
    buyer:[
        {
            title:"Overview",
            href:"/dashboard/buyer"
        },
        {
            title:"Orders",
            href:"/dashboard/buyer/orders"
        },
        {
            title:"Wishlist",
            href:"/dashboard/buyer/wishlist"
        },
        {
            title:"Profile",
            href:"/dashboard/buyer/profile"
        }
    ],
    admin:[
        {
            title:"Overview",
            href:"/dashboard/admin"
        },
        {
            title:"Users",
            href:"/dashboard/admin/users"
        },
        {
            title:"Products",
            href:"/dashboard/admin/products"
        }
    ]
}
const menus = navmenu[role];
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-xl font-bold">TechBazaar</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {/* <Icon size={18} /> */}
              {menu.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}