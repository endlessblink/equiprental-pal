import { Film, Calendar, QrCode, Bell, Settings, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "ציוד", icon: QrCode, url: "/" },
  { title: "לוח שנה", icon: Calendar, url: "/calendar" },
  { title: "תלמידים", icon: Users, url: "/students" },
  { title: "ניהול", icon: ShieldCheck, url: "/admin" },
  { title: "התראות", icon: Bell, url: "/notifications" },
  { title: "הגדרות", icon: Settings, url: "/settings" },
];

export function TopNav() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="mr-8 font-bold text-xl">מלאי ציוד צילום</div>
        <nav className="flex items-center space-x-6 ml-6">
          {menuItems.map((item) => (
            <Link key={item.url} to={item.url}>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}