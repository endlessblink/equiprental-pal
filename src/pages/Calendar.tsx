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
} from "@/components/ui/dialog";

// Mock data - replace with actual data from your backend
const initialEvents = [
  {
    title: 'מצלמת Canon - דני כהן',
    start: '2024-12-21',
    end: '2024-12-23',
    backgroundColor: '#3b82f6',
  },
  {
    title: 'חצובה - שרה לוי',
    start: '2024-12-20',
    end: '2024-12-21',
    backgroundColor: '#10b981',
  },
];

interface RentalEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
}

const Calendar = () => {
  const [events, setEvents] = useState<RentalEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<RentalEvent | null>(null);

  const handleEventClick = (info: any) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      backgroundColor: info.event.backgroundColor,
    });
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

        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>פרטי השאלה</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedEvent && (
                <>
                  <div>
                    <h4 className="font-semibold">ציוד ושואל:</h4>
                    <p>{selectedEvent.title}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">תאריך התחלה:</h4>
                    <p>{new Date(selectedEvent.start).toLocaleDateString('he-IL')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">תאריך סיום:</h4>
                    <p>{new Date(selectedEvent.end).toLocaleDateString('he-IL')}</p>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Calendar;