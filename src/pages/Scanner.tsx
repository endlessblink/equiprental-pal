import { TopNav } from "@/components/TopNav";

const Scanner = () => {
  return (
    <div className="min-h-screen w-full" dir="rtl">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">סורק QR</h2>
        {/* TODO: Add QR scanner implementation */}
      </main>
    </div>
  );
};

export default Scanner;