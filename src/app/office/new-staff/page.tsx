import NewStaffForm from "@/components/new-staff-ui/new-staff-form";

export default async function NewStaffPage() {
  return (
    <div className="p-10 w-full h-full">
      <div className="bg-background w-full h-full rounded-xl flex justify-center pt-20  ">
        <NewStaffForm />
      </div>
    </div>
  );
}
