import fetchConnectedUsers from "@/lib/data/users";
import UserChatLink from "@/components/UserChatLink";

export default async function UserList() {
  const users = await fetchConnectedUsers();

  return (
    <ul>
      {users.map((user) => (
        <UserChatLink key={user.id} {...user} />
      ))}
    </ul>
  );
}
