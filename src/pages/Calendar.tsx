import { TopNav } from "@/components/TopNav";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

// Mock data - replace with actual data from your backend
const initialEvents = [
  {
    title: 'מצלמת Canon - דני כהן',
    start: '2024-12-21',
    end: '2024-12-23',
    backgroundColor: '#3b82f6',
    equipment: 'מצלמת Canon',
    renter: 'דני כהן',
  },
  {
    title: 'חצובה - שרה לוי',
    start: '2024-12-20',
    end: '2024-12-21',
    backgroundColor: '#10b981',
    equipment: 'חצובה',
    renter: 'שרה לוי',
  },
];

interface RentalEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  equipment?: string;
  renter?: string;
}

const Calendar = () => {
  const [events, setEvents] = useState<RentalEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<RentalEvent | null>(null);
  const [editedEvent, setEditedEvent] = useState<RentalEvent | null>(null);

  const handleEventClick = (info: any) => {
    const event = {
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      backgroundColor: info.event.backgroundColor,
      equipment: info.event._def.extendedProps.equipment,
      renter: info.event._def.extendedProps.renter,
    };
    setSelectedEvent(event);
    setEditedEvent(event);
  };

  const handleSave = () => {
    if (editedEvent && selectedEvent) {
      // Update the events array with the edited event
      setEvents(events.map(event => 
        event.title === selectedEvent.title ? {
          ...event,
          title: `${editedEvent.equipment} - ${editedEvent.renter}`,
          equipment: editedEvent.equipment,
          renter: editedEvent.renter,
          start: editedEvent.start,
          end: editedEvent.end,
        } : event
      ));
      setSelectedEvent(null);
      setEditedEvent(null);
    }
  };

  return (
    <div className="min-h-screen w-full" dir="rtl">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">לוח שנה</h2>
          <Button variant="outline">הוספת השאלה</Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              start: 'title',
              center: '',
              end: 'prev,next today'
            }}
            locale="he"
            direction="rtl"
            height="auto"
          />
        </div>

        <Dialog open={!!selectedEvent} onOpenChange={() => {
          setSelectedEvent(null);
          setEditedEvent(null);
        }}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>פרטי השאלה</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="equipment">ציוד</Label>
                <Input
                  id="equipment"
                  value={editedEvent?.equipment || ''}
                  onChange={(e) => setEditedEvent(prev => prev ? {...prev, equipment: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="renter">שואל</Label>
                <Input
                  id="renter"
                  value={editedEvent?.renter || ''}
                  onChange={(e) => setEditedEvent(prev => prev ? {...prev, renter: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">תאריך התחלה</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={editedEvent?.start || ''}
                  onChange={(e) => setEditedEvent(prev => prev ? {...prev, start: e.target.value} : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">תאריך סיום</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={editedEvent?.end || ''}
                  onChange={(e) => setEditedEvent(prev => prev ? {...prev, end: e.target.value} : null)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setSelectedEvent(null);
                setEditedEvent(null);
              }}>
                ביטול
              </Button>
              <Button onClick={handleSave}>
                שמור שינויים
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Calendar;