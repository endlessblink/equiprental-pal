import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Student } from "@/types/student";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  importStudents,
} from "@/api/students";
import { toast } from "sonner";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student: Omit<Student, "id">) => createStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("התלמיד נוסף בהצלחה");
    },
    onError: (error) => {
      toast.error("שגיאה בהוספת התלמיד", {
        description: error.message,
      });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...student }: Partial<Student> & { id: string }) =>
      updateStudent(id, student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("פרטי התלמיד עודכנו בהצלחה");
    },
    onError: (error) => {
      toast.error("שגיאה בעדכון פרטי התלמיד", {
        description: error.message,
      });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("התלמיד הוסר בהצלחה");
    },
    onError: (error) => {
      toast.error("שגיאה בהסרת התלמיד", {
        description: error.message,
      });
    },
  });
}

export function useImportStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importStudents,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(`${data.length} תלמידים נוספו בהצלחה`);
    },
    onError: (error) => {
      toast.error("שגיאה בייבוא התלמידים", {
        description: error.message,
      });
    },
  });
}
