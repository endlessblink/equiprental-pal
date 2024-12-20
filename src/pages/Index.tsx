import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Equipment } from "@/types/equipment";

// Mock data - replace with actual data later
const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Canon EOS R5",
    category: "מצלמות",
    description: "מצלמת מירורלס פול-פריים מקצועית עם יכולת צילום וידאו 8K",
    status: "available",
    imageUrl: "/placeholder.svg",
    qrCode: "equipment-1",
  },
  {
    id: "2",
    name: "DJI Ronin-S",
    category: "מייצבים",
    description: "מייצב 3 צירים למצלמות DSLR ומירורלס",
    status: "rented",
    imageUrl: "/placeholder.svg",
    qrCode: "equipment-2",
  },
  {
    id: "3",
    name: "Sennheiser MKE 600",
    category: "אודיו",
    description: "מיקרופון שוטגאן להקלטת וידאו",
    status: "available",
    imageUrl: "/placeholder.svg",
    qrCode: "equipment-3",
  },
];

const Index = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const handleRent = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    // TODO: Open rental calendar modal
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" dir="rtl">
        <AppSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">מלאי ציוד צילום</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEquipment.map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                onRent={handleRent}
              />
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;