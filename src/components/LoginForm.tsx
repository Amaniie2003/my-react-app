import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [submittedName, setSubmittedName] = useState(""); // Tambah state untuk paparan

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedName(username); // Simpan nilai untuk dipaparkan
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Paparkan mesej jika ada nama yang dihantar */}
      {submittedName && <p>Submitted successfully: {submittedName}</p>}
    </div>
  );
}

export default LoginForm;