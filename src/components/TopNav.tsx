import { Film, Calendar, QrCode, Bell, Settings, ShieldCheck, UserGroup } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "ציוד", icon: QrCode, url: "/" },
  { title: "לוח שנה", icon: Calendar, url: "/calendar" },
  { title: "תלמידים", icon: UserGroup, url: "/students" },
  { title: "ניהול", icon: ShieldCheck, url: "/admin" },
  { title: "התראות", icon: Bell, url: "/notifications" },
  { title: "הגדרות", icon: Settings, url: "/settings" },
];

export function TopNav() {
  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">מלאי ציוד צילום</h1>
          <div className="flex gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}