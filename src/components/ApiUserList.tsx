import { useEffect, useState } from "react";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: {
    name: string; 
  };
}

export default function ApiUserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2> User List</h2>
      {users.map((user) => (
        <div 
          key={user.id} 
          style={{ 
            border: "1px solid #ccc", 
            margin: "15px 0", 
            padding: "15px", 
            borderRadius: "8px",
            background: "#f9f9f9"
          }}
        >
          <h3>{user.name} ({user.username})</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Address:</strong> {user.address.suite}, {user.address.street}, {user.address.city} ({user.address.zipcode})</p>
          <p><strong>Company:</strong> {user.company.name}</p>
        </div>
      ))}
    </div>
  );
}