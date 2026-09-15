import { Link } from "react-router-dom";

function Settings() {
  return (
    <div style={{ padding: "20px" }}>
      {/* Menu Navigation Tab */}
      <nav style={{ display: "flex", gap: "15px", marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/Setting" style={{ fontWeight: "bold" }}>Setting</Link>
      </nav>

      <h1>Settings Page</h1>
    </div>
  );
}

export default Settings;