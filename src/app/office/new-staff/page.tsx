import NewStaffForm from "@/components/new-staff-form";

export default async function NewStaffPage() {
  return (
    <div className="p-10 w-full h-full bg-border">
      <div className="bg-background w-full h-full rounded-xl flex justify-center items-center">
        <NewStaffForm />
      </div>
    </div>
  );
}
