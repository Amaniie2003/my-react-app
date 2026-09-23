import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { ExternalUser } from "../types/user";

export default function ApiUserList() {
  const [users, setUsers] = useState<ExternalUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">External Contacts</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Data synchronized from remote API</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800/50 animate-pulse h-64 rounded-3xl" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
