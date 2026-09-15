import { useState } from "react";
import CreateUser from "../components/CreateUser";
import UserList from "../components/UserList";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const [createdUser, setCreatedUser] = useState<{ id: number; name: string; email: string } | null>(null);

  const handleUserCreated = (newUser: { id: number; name: string; email: string }) => {
    setCreatedUser(newUser);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <LogoutButton />
      </div>

      <CreateUser onUserCreated={handleUserCreated} />
      <UserList newUser={createdUser} />
    </div>
  );
}