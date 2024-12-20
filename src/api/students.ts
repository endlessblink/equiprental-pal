import { Student } from "@/types/student";

// Local storage key
const STORAGE_KEY = 'equipment-pal-students';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to get initial data
const getInitialData = (): Student[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export async function getStudents() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getInitialData();
}

export async function getStudent(id: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const students = getInitialData();
  const student = students.find(s => s.id === id);
  if (!student) throw new Error('Student not found');
  return student;
}

export async function createStudent(student: Omit<Student, 'id'>) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const students = getInitialData();
  const newStudent = {
    ...student,
    id: generateId(),
  };
  students.push(newStudent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return newStudent;
}

export async function updateStudent(id: string, update: Partial<Student>) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const students = getInitialData();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Student not found');
  
  const updatedStudent = {
    ...students[index],
    ...update,
  };
  students[index] = updatedStudent;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return updatedStudent;
}

export async function deleteStudent(id: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const students = getInitialData();
  const filtered = students.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function importStudents(newStudents: Omit<Student, 'id'>[]) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const students = getInitialData();
  const studentsWithIds = newStudents.map(student => ({
    ...student,
    id: generateId(),
  }));
  const updated = [...students, ...studentsWithIds];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return studentsWithIds;
}
