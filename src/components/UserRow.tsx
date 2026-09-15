// src/components/UserRow.tsx
import React from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserRowProps {
  user: User;
  onSelect?: (id: number) => void;
}

export const UserRow = React.memo(function UserRow({ user, onSelect }: UserRowProps) {
  console.log(`Render row: ${user.id}`); // Boleh check F12 console nanti
  
  return (
    <div 
      onClick={() => onSelect?.(user.id)}
      style={{ padding: "8px 0", cursor: "pointer", borderBottom: "1px solid #eee" }}
    >
      {user.first_name} {user.last_name} ({user.email})
    </div>
  );
});