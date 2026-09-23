import { useEffect, useState, useMemo } from "react";
import CreateUser from "../components/CreateUser";
import UserDetailModal from "../components/UserDetailModal";
import apiClient from "../services/apiClient";
import { User } from "../types/user";
import { useDebounce } from "../hooks/useDebounce";

const USERS_PER_PAGE = 6;

const DEFAULT_USERS: User[] = [
  { id: 1, email: "george.bluth@reqres.in", first_name: "George", last_name: "Bluth", avatar: "https://reqres.in/img/faces/1-image.jpg" },
  { id: 2, email: "janet.weaver@reqres.in", first_name: "Janet", last_name: "Weaver", avatar: "https://reqres.in/img/faces/2-image.jpg" },
  { id: 3, email: "emma.wong@reqres.in", first_name: "Emma", last_name: "Wong", avatar: "https://reqres.in/img/faces/3-image.jpg" },
  { id: 4, email: "eve.holt@reqres.in", first_name: "Eve", last_name: "Holt", avatar: "https://reqres.in/img/faces/4-image.jpg" },
  { id: 5, email: "charles.morris@reqres.in", first_name: "Charles", last_name: "Morris", avatar: "https://reqres.in/img/faces/5-image.jpg" },
  { id: 6, email: "tracey.ramos@reqres.in", first_name: "Tracey", last_name: "Ramos", avatar: "https://reqres.in/img/faces/6-image.jpg" },
  { id: 7, email: "michael.lawson@reqres.in", first_name: "Michael", last_name: "Lawson", avatar: "https://reqres.in/img/faces/7-image.jpg" },
  { id: 8, email: "lindsay.ferguson@reqres.in", first_name: "Lindsay", last_name: "Ferguson", avatar: "https://reqres.in/img/faces/8-image.jpg" },
  { id: 9, email: "tobias.funke@reqres.in", first_name: "Tobias", last_name: "Funke", avatar: "https://reqres.in/img/faces/9-image.jpg" },
  { id: 10, email: "byron.fields@reqres.in", first_name: "Byron", last_name: "Fields", avatar: "https://reqres.in/img/faces/10-image.jpg" },
  { id: 11, email: "george.edwards@reqres.in", first_name: "George", last_name: "Edwards", avatar: "https://reqres.in/img/faces/11-image.jpg" },
  { id: 12, email: "rachel.howell@reqres.in", first_name: "Rachel", last_name: "Howell", avatar: "https://reqres.in/img/faces/12-image.jpg" },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(DEFAULT_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Debounce: Tunggu 300ms selepas user berhenti search baru filter
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleUserCreated = (newUser: { id: number; name: string; email: string }) => {
    const [first_name, ...rest] = newUser.name.split(" ");
    const last_name = rest.join(" ");

    const formattedNewUser: User = {
      id: newUser.id,
      email: newUser.email,
      first_name: first_name || newUser.name,
      last_name: last_name || "",
      avatar: `https://reqres.in/img/faces/${(newUser.id % 12) || 1}-image.jpg`,
    };

    // Tambah ke React state in-memory (akan reset bila logout / refresh)
    setAllUsers((prev) => [formattedNewUser, ...prev]);
  };

  // Client-Side Pagination: Fetch SEMUA user dari API sekaligus
  useEffect(() => {
    // Fetch kedua-dua page secara serentak
    Promise.all([
      apiClient.get("/users?page=1"),
      apiClient.get("/users?page=2"),
    ])
      .then(([res1, res2]) => {
        if (res1?.data?.data && res2?.data?.data) {
          const apiUsers = [...res1.data.data, ...res2.data.data];
          setAllUsers(apiUsers);
        }
      })
      .catch((err) => {
        console.warn("Reqres API rate limit reached or offline, fallback to default dataset:", err);
        setAllUsers(DEFAULT_USERS);
      })
      .finally(() => setLoading(false));
  }, []);

  // useMemo: Filter user berdasarkan carian (debounced)
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    );
  }, [allUsers, debouncedSearchTerm]);

  // Client-side pagination: potong senarai mengikut page semasa
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, page]);

  // Reset ke page 1 apabila carian berubah
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Create User Form */}
        <div className="xl:col-span-1">
          <CreateUser onUserCreated={handleUserCreated} />
        </div>

        {/* Right Column: User Directory */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">User Directory</h3>
                <p className="text-xs text-slate-500">Manage your latest registered members</p>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}

            {/* User grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-center space-y-2 hover:shadow-md transition-all cursor-pointer"
                    >
                      <img
                        src={user.avatar || "https://reqres.in/img/faces/1-image.jpg"}
                        alt={user.first_name}
                        className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {user.first_name} {user.last_name}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-sm text-slate-400 py-8">
                    No users found matching "{debouncedSearchTerm}"
                  </p>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <UserDetailModal 
        userId={selectedUser?.id ?? null} 
        initialUser={selectedUser}
        onClose={() => setSelectedUser(null)} 
      />
    </div>
  );
}
