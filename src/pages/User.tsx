import { Link } from "react-router-dom";
import ApiUserList from "../components/ApiUserList";

function Users() {
  return (
    <div style={{ padding: "20px" }}>
      {/* Menu Navigation Tab */}
      <nav style={{ display: "flex", gap: "15px", marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users" style={{ fontWeight: "bold" }}>Users</Link>
        <Link to="/setting">Setting</Link>
      </nav>

      <h1>Users Page</h1>
      <ApiUserList />
    </div>
  );
}

export default Users;