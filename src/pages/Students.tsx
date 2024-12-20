import { useState, useRef } from "react";
import { TopNav } from "@/components/TopNav";
import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as XLSX from 'xlsx';
import { toast } from "sonner";
import { useStudents, useCreateStudent, useUpdateStudent, useImportStudents } from "@/hooks/use-students";
import { Loader2 } from "lucide-react";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: students, isLoading } = useStudents();
  const { mutate: createStudent, isPending: isCreating } = useCreateStudent();
  const { mutate: updateStudent, isPending: isUpdating } = useUpdateStudent();
  const { mutate: importStudents, isPending: isImporting } = useImportStudents();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: any[] = XLSX.utils.sheet_to_json(firstSheet);

          // Transform Excel data to match Student interface
          const newStudents = jsonData.map((row) => ({
            name: row['שם'] || '',
            email: row['אימייל'] || '',
            phone: row['טלפון'] || '',
            class: row['כיתה'] || '',
            status: 'active' as const,
            notes: row['הערות'] || '',
          }));

          importStudents(newStudents);
        } catch (error) {
          toast.error("שגיאה בטעינת הקובץ", {
            description: "אנא ודא שהקובץ בפורמט הנכון",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleSaveStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      class: formData.get('class') as string,
      status: formData.get('status') as 'active' | 'inactive',
      notes: formData.get('notes') as string,
    };

    if (selectedStudent) {
      updateStudent({ id: selectedStudent.id, ...studentData });
    } else {
      createStudent(studentData);
    }

    setIsDialogOpen(false);
    setSelectedStudent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full" dir="rtl">
        <TopNav />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" dir="rtl">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ניהול תלמידים</h1>
          <div className="space-x-4 flex flex-row-reverse">
            <Button 
              onClick={() => setIsDialogOpen(true)}
              disabled={isCreating}
            >
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              הוספת תלמיד
            </Button>
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isImporting}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
              >
                {isImporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                ייבוא מאקסל
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם</TableHead>
                <TableHead>אימייל</TableHead>
                <TableHead>טלפון</TableHead>
                <TableHead>כיתה</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>הערות</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    {student.status === 'active' ? 'פעיל' : 'לא פעיל'}
                  </TableCell>
                  <TableCell>{student.notes}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      disabled={isUpdating}
                    >
                      {isUpdating && selectedStudent?.id === student.id && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      ערוך
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedStudent ? 'עריכת תלמיד' : 'הוספת תלמיד'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveStudent}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">שם</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={selectedStudent?.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">אימייל</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedStudent?.email}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">טלפון</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={selectedStudent?.phone}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">כיתה</Label>
                  <Input
                    id="class"
                    name="class"
                    defaultValue={selectedStudent?.class}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">סטטוס</Label>
                  <Select
                    name="status"
                    defaultValue={selectedStudent?.status || 'active'}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">פעיל</SelectItem>
                      <SelectItem value="inactive">לא פעיל</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">הערות</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    defaultValue={selectedStudent?.notes}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit"
                  disabled={isCreating || isUpdating}
                >
                  {(isCreating || isUpdating) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {selectedStudent ? 'שמור שינויים' : 'הוסף תלמיד'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Students;
