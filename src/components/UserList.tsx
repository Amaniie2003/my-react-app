import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import UserDetailModal from "./UserDetailModal";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserListProps {
  newUser?: { id: number; name: string; email: string } | null;
}

export default function UserList({ newUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // State untuk Pagination & Carian
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk kesan Hover pada kad
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);

  // Fetch data mengikut nombor page
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/users?page=${page}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, [page]);

  // Tambah user baharu ke senarai (papar di page 1)
  useEffect(() => {
    if (newUser && page === 1) {
      const nameParts = newUser.name.trim().split(" ");
      const firstName = nameParts[0] || newUser.name;
      const lastName = nameParts.slice(1).join(" ") || "";

      const formattedUser: User = {
        id: newUser.id,
        email: newUser.email,
        first_name: firstName,
        last_name: lastName,
        avatar: `https://reqres.in/img/faces/${(newUser.id % 12) || 1}-image.jpg`,
      };

      setUsers((prevUsers) => [formattedUser, ...prevUsers]);
    }
  }, [newUser, page]);

  // Tapis senarai pengguna berdasarkan carian nama/emel
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <h3 style={{ margin: 0 }}>User List</h3>

        {/* Input Carian */}
        <input
          type="text"
          placeholder="Search user by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Grid Senarai Pengguna dengan Hover Effect */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isHovered = hoveredUserId === user.id;

                return (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUserId(user.id)}
                    onMouseEnter={() => setHoveredUserId(user.id)}
                    onMouseLeave={() => setHoveredUserId(null)}
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      padding: "15px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: isHovered
                        ? "0 6px 12px rgba(0, 0, 0, 0.12)"
                        : "0 2px 4px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <h4 style={{ margin: "10px 0 5px", color: "#333" }}>
                      {user.first_name} {user.last_name}
                    </h4>
                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{user.email}</p>
                  </div>
                );
              })
            ) : (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#888" }}>
                No users found matching "{searchQuery}".
              </p>
            )}
          </div>

          {/* Kawalan Pagination */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginTop: "25px" }}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              style={{
                padding: "8px 16px",
                cursor: page === 1 ? "not-allowed" : "pointer",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: page === 1 ? "#f5f5f5" : "#fff",
                color: page === 1 ? "#aaa" : "#333",
                transition: "background-color 0.2s",
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              style={{
                padding: "8px 16px",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: page === totalPages ? "#f5f5f5" : "#fff",
                color: page === totalPages ? "#aaa" : "#333",
                transition: "background-color 0.2s",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal User Details */}
      <UserDetailModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
    </div>
  );
}