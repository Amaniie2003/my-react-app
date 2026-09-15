// src/components/CreateUser.tsx
import { useState, type FormEvent } from "react";
import apiClient from "../services/apiClient";

interface CreateUserProps {
  onUserCreated?: (newUser: { id: number; name: string; email: string }) => void;
}

export default function CreateUser({ onUserCreated }: CreateUserProps) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Send POST request to ReqRes API
      const response = await apiClient.post("/users", { name, job });
      
      setSuccessMessage(`Success! User "${response.data.name}" (ID: ${response.data.id}) has been created.`);
      
      if (onUserCreated) {
        onUserCreated({
          id: Number(response.data.id),
          name: response.data.name,
          email: `${response.data.name.toLowerCase().replace(/\s+/g, '')}@reqres.in`,
        });
      }

      // Reset form fields
      setName("");
      setJob("");
    } catch (err) {
      setError("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Add New User</h3>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Job:</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}