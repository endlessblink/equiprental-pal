export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'available' | 'rented' | 'maintenance';
  imageUrl: string;
  qrCode: string;
}

export interface RentalPeriod {
  startDate: Date;
  endDate: Date;
  equipmentId: string;
  userId: string;
}