export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  status: 'active' | 'inactive';
  notes?: string;
}
