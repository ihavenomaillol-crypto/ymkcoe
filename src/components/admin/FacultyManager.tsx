import { useState, useEffect } from "react";
import { useGetFaculty, getGetFacultyQueryKey, useCreateFacultyMember, useDeleteFacultyMember, useUpdateFacultyMember } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEPARTMENTS } from "@/lib/departments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const facultySchema = z.object({
  name: z.string().min(1, "Name is required"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  experience: z.coerce.number().optional(),
  email: z.string().email().optional().or(z.literal('')),
});

export function FacultyManager() {
  const { data: facultyData, isLoading } = useGetFaculty();
  const faculty = Array.isArray(facultyData) ? facultyData : [];
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteFaculty = useDeleteFacultyMember();
  const createFaculty = useCreateFacultyMember();
  const updateFaculty = useUpdateFacultyMember();
  const [open, setOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<any>(null);

  const defaultValues = {
    name: "",
    department: DEPARTMENTS[0].label,
    designation: "Professor",
    experience: 5,
    email: "",
  };

  const form = useForm<z.infer<typeof facultySchema>>({
    resolver: zodResolver(facultySchema),
    defaultValues
  });

  useEffect(() => {
    if (!open) {
      setEditingFaculty(null);
      form.reset(defaultValues);
    }
  }, [open, form]);

  const handleEdit = (faculty: any) => {
    setEditingFaculty(faculty);
    form.reset({
      name: faculty.name,
      department: faculty.department,
      designation: faculty.designation,
      experience: faculty.experience || 5,
      email: faculty.email || "",
    });
    setOpen(true);
  };

  const onSubmit = (data: z.infer<typeof facultySchema>) => {
    if (editingFaculty) {
      updateFaculty.mutate({ id: editingFaculty.id, data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetFacultyQueryKey() });
          toast({ title: "Faculty member updated" });
          setOpen(false);
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to update faculty member" });
        }
      });
    } else {
      createFaculty.mutate({ data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetFacultyQueryKey() });
          toast({ title: "Faculty member added" });
          setOpen(false);
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to add faculty member" });
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this faculty member?")) {
      deleteFaculty.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetFacultyQueryKey() });
          toast({ title: "Faculty member removed" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to remove faculty member" });
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Manage Faculty</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary"><Plus className="w-4 h-4 mr-2" /> Add Faculty</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFaculty ? "Edit Faculty Member" : "Add Faculty Member"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )} />
                <FormField control={form.control} name="department" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept.id} value={dept.label}>{dept.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )} />
                <FormField control={form.control} name="designation" render={({ field }) => (
                  <FormItem><FormLabel>Designation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem><FormLabel>Experience (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage/></FormItem>
                  )} />
                </div>
                <Button type="submit" className="w-full" disabled={createFaculty.isPending || updateFaculty.isPending}>
                  {createFaculty.isPending || updateFaculty.isPending ? "Saving..." : (editingFaculty ? "Update" : "Save")}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : faculty.length > 0 ? (
              faculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {member.name}
                      {member.isHOD && <Badge variant="outline" className="bg-accent/10 text-accent text-[10px] py-0">HOD</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => handleEdit(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No faculty members found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
