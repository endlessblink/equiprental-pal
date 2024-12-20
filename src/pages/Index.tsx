import { useState } from "react";
import { Equipment } from "@/types/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { TopNav } from "@/components/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - replace with actual data later
const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Canon EOS R5",
    category: "מצלמות",
    description: "מצלמת מירורלס פול-פריים מקצועית עם יכולת צילום וידאו 8K",
    status: "rented",
    imageUrl: "/placeholder.svg",
    qrCode: "equipment-1",
    renter: {
      name: "יעל לוי",
      returnDate: "2024-12-27",
    },
  },
  {
    id: "2",
    name: "DJI Ronin-S",
    category: "מייצבים",
    description: "מייצב 3 צירים למצלמות DSLR ומירורלס",
    status: "rented",
    imageUrl: "/placeholder.svg",
    qrCode: "equipment-2",
    renter: {
      name: "דני כהן",
      returnDate: "2024-12-25",
    },
  },
  {
    id: "3",
    name: "Sennheiser MKE 600",
    category: "אודיו",
    description: "מיקרופון שוטגאן להקלטת וידאו",
    status: "rented",
    imageUrl: "/placeholder.svg",
    qrCode: "equipment-3",
    renter: {
      name: "שרה לוי",
      returnDate: "2024-12-22",
    },
  },
];

const Index = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const availableEquipment = mockEquipment.filter(
    (equipment) => equipment.status === "available"
  );
  const rentedEquipment = mockEquipment.filter(
    (equipment) => equipment.status === "rented"
  );

  return (
    <div className="min-h-screen w-full" dir="rtl">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">ציוד זמין</TabsTrigger>
            <TabsTrigger value="rented">ציוד מושאל</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <Card>
              <CardHeader>
                <CardTitle>ציוד זמין להשאלה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableEquipment.map((equipment) => (
                    <EquipmentCard
                      key={equipment.id}
                      equipment={equipment}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rented">
            <Card>
              <CardHeader>
                <CardTitle>ציוד מושאל</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rentedEquipment.map((equipment) => (
                    <div key={equipment.id} className="relative">
                      <EquipmentCard equipment={equipment} />
                      {equipment.renter && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium">מושאל ל: {equipment.renter.name}</p>
                          <p className="text-sm text-gray-600">
                            תאריך החזרה: {new Date(equipment.renter.returnDate).toLocaleDateString('he-IL')}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;