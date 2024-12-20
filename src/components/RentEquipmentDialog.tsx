import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Equipment } from "@/types/equipment";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface RentEquipmentDialogProps {
  equipment: Equipment;
  isOpen: boolean;
  onClose: () => void;
}

export function RentEquipmentDialog({ equipment, isOpen, onClose }: RentEquipmentDialogProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [quantity, setQuantity] = useState(1);

  const handleRent = () => {
    if (!startDate || !endDate) {
      toast.error("נא לבחור תאריכי השכרה");
      return;
    }

    if (startDate > endDate) {
      toast.error("תאריך התחלה חייב להיות לפני תאריך סיום");
      return;
    }

    if (quantity < 1) {
      toast.error("כמות חייבת להיות לפחות 1");
      return;
    }

    // כאן יתווסף בהמשך הלוגיקה לשמירת ההשכרה
    toast.success("הציוד הושכר בהצלחה");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>השכרת {equipment.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label>תאריך התחלה</label>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>
          <div className="grid gap-2">
            <label>תאריך סיום</label>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              disabled={(date) => date < (startDate || new Date())}
              className="rounded-md border"
            />
          </div>
          <div className="grid gap-2">
            <label>כמות</label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <Button onClick={handleRent}>אישור השכרה</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}