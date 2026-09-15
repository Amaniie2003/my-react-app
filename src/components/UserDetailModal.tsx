import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

interface UserDetail {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface SupportInfo {
  url: string;
  text: string;
}

interface UserDetailModalProps {
  userId: number | null;
  onClose: () => void;
}

export default function UserDetailModal({ userId, onClose }: UserDetailModalProps) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [support, setSupport] = useState<SupportInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError("");
    setUser(null);

    // GET single user daripada ReqRes API
    apiClient
      .get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data.data);
        setSupport(response.data.support);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        // Kendalikan 404 khusus untuk mock user baharu
        if (err.response?.status === 404) {
          setError(
            `User with ID ${userId} is a newly created mock user. ReqRes API does not persist new entries on their server, so details cannot be fetched via API.`
          );
        } else {
          setError("Failed to fetch user details.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (!userId) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "none",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h3 style={{ marginTop: 0 }}>User Details</h3>

        {loading && <p>Loading user details...</p>}

        {error && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeeba",
              borderRadius: "6px",
              color: "#856404",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {user && (
          <div style={{ textAlign: "center" }}>
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "10px" }}
            />
            <h4 style={{ margin: "10px 0 5px" }}>
              {user.first_name} {user.last_name}
            </h4>
            <p style={{ color: "#555", margin: "5px 0" }}>
              <strong>ID:</strong> {user.id}
            </p>
            <p style={{ color: "#555", margin: "5px 0" }}>
              <strong>Email:</strong> {user.email}
            </p>

            {support && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Note:</strong> {support.text}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}