function UserList() {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Sarah" },
    { id: 3, name: "David" }
  ];

  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </>
  );
}

export default UserList;