import { useState } from "react";
import { Link } from "react-router-dom"; // 1. Import Link dari react-router-dom
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
      {/*  Navigation Tab  */}
      <nav style={{ display: "flex", gap: "15px", marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <Link to="/dashboard" style={{ fontWeight: "bold" }}>Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/setting">Setting</Link>
      </nav>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <LogoutButton />
      </div>

      <CreateUser onUserCreated={handleUserCreated} />
      <UserList newUser={createdUser} />
    </div>
  );
}