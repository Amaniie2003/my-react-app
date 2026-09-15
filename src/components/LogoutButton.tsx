// src/components/LogoutButton.tsx
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear access token and user session from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    
    // Redirect user back to the login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}