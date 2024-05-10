import UserList from "@/components/UserList";

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-80 bg-gray-900">
        <UserList />
      </div>
      <div className="flex-1 col-span-2"></div>
    </div>
  );
}
