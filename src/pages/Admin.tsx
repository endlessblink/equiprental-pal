import { TopNav } from "@/components/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// Mock data - replace with actual data from your backend
const rentalStats = {
  totalEquipment: 15,
  currentlyRented: 5,
  lateReturns: 2,
  availableEquipment: 8,
};

const recentRentals = [
  {
    id: "1",
    equipmentName: "Canon EOS R5",
    renterName: "דני כהן",
    startDate: "2024-12-18",
    returnDate: "2024-12-25",
    status: "active",
  },
  {
    id: "2",
    equipmentName: "DJI Ronin-S",
    renterName: "שרה לוי",
    startDate: "2024-12-15",
    returnDate: "2024-12-22",
    status: "late",
  },
  {
    id: "3",
    equipmentName: "Sennheiser MKE 600",
    renterName: "יוסי מזרחי",
    startDate: "2024-12-19",
    returnDate: "2024-12-26",
    status: "active",
  },
];

const equipmentStatus = [
  {
    id: "1",
    name: "Canon EOS R5",
    totalUnits: 2,
    available: 1,
    rented: 1,
    maintenance: 0,
  },
  {
    id: "2",
    name: "DJI Ronin-S",
    totalUnits: 3,
    available: 1,
    rented: 1,
    maintenance: 1,
  },
  {
    id: "3",
    name: "Sennheiser MKE 600",
    totalUnits: 4,
    available: 2,
    rented: 2,
    maintenance: 0,
  },
];

const Admin = () => {
  return (
    <div className="min-h-screen w-full" dir="rtl">
      <TopNav />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ניהול מערכת</h1>
          <Button>הוספת ציוד חדש</Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">סה״כ פריטים</p>
                  <p className="text-2xl font-bold">{rentalStats.totalEquipment}</p>
                </div>
                <PieChart className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">מושאל כרגע</p>
                  <p className="text-2xl font-bold">{rentalStats.currentlyRented}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">באיחור</p>
                  <p className="text-2xl font-bold">{rentalStats.lateReturns}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">זמין להשאלה</p>
                  <p className="text-2xl font-bold">{rentalStats.availableEquipment}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rentals">השאלות אחרונות</TabsTrigger>
            <TabsTrigger value="inventory">מצאי ציוד</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals">
            <Card>
              <CardHeader>
                <CardTitle>השאלות אחרונות</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ציוד</TableHead>
                      <TableHead>שואל</TableHead>
                      <TableHead>תאריך השאלה</TableHead>
                      <TableHead>תאריך החזרה</TableHead>
                      <TableHead>סטטוס</TableHead>
                      <TableHead>פעולות</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRentals.map((rental) => (
                      <TableRow key={rental.id}>
                        <TableCell>{rental.equipmentName}</TableCell>
                        <TableCell>{rental.renterName}</TableCell>
                        <TableCell>{new Date(rental.startDate).toLocaleDateString('he-IL')}</TableCell>
                        <TableCell>{new Date(rental.returnDate).toLocaleDateString('he-IL')}</TableCell>
                        <TableCell>
                          <Badge variant={rental.status === 'late' ? 'destructive' : 'default'}>
                            {rental.status === 'late' ? 'באיחור' : 'פעיל'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            סימון כהוחזר
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>מצאי ציוד</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>שם הציוד</TableHead>
                      <TableHead>סה״כ יחידות</TableHead>
                      <TableHead>זמין</TableHead>
                      <TableHead>מושאל</TableHead>
                      <TableHead>בתחזוקה</TableHead>
                      <TableHead>פעולות</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentStatus.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.totalUnits}</TableCell>
                        <TableCell>{item.available}</TableCell>
                        <TableCell>{item.rented}</TableCell>
                        <TableCell>{item.maintenance}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            ערוך
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
