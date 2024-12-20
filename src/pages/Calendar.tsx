import { TopNav } from "@/components/TopNav";

const Calendar = () => {
  return (
    <div className="min-h-screen w-full" dir="rtl">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">לוח שנה</h2>
        {/* TODO: Add calendar implementation */}
      </main>
    </div>
  );
};

export default Calendar;