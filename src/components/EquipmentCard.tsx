import { Equipment } from "@/types/equipment";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EquipmentCardProps {
  equipment: Equipment;
  onRent?: (equipment: Equipment) => void;
}

export function EquipmentCard({ equipment, onRent }: EquipmentCardProps) {
  const { toast } = useToast();

  const handleRent = () => {
    if (onRent) {
      onRent(equipment);
      toast({
        title: "Equipment Selected",
        description: "Please choose your rental dates.",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{equipment.name}</span>
          <span className={`px-2 py-1 text-sm rounded-full ${
            equipment.status === 'available' ? 'bg-green-100 text-green-800' :
            equipment.status === 'rented' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {equipment.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={equipment.imageUrl}
          alt={equipment.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <p className="text-sm text-gray-600">{equipment.description}</p>
        <p className="text-sm text-gray-500 mt-2">Category: {equipment.category}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleRent}
          disabled={equipment.status !== 'available'}
          className="w-full"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Rent Equipment
        </Button>
      </CardFooter>
    </Card>
  );
}