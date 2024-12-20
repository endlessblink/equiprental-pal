import { Student } from "@/types/student";
import { supabase } from "@/lib/supabase";

export async function getStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data as Student[];
}

export async function getStudent(id: string) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Student;
}

export async function createStudent(student: Omit<Student, 'id'>) {
  const { data, error } = await supabase
    .from('students')
    .insert([student])
    .select()
    .single();
  
  if (error) throw error;
  return data as Student;
}

export async function updateStudent(id: string, student: Partial<Student>) {
  const { data, error } = await supabase
    .from('students')
    .update(student)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Student;
}

export async function deleteStudent(id: string) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function importStudents(students: Omit<Student, 'id'>[]) {
  const { data, error } = await supabase
    .from('students')
    .insert(students)
    .select();
  
  if (error) throw error;
  return data as Student[];
}
