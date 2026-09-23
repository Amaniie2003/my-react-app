import ApiUserList from "../components/ApiUserList";

function Users() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Users Management</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Browse and manage detailed user information synced from external sources.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-blue-800">
              API Source: JSONPlaceholder
            </span>
          </div>
        </div>
      </div>

      {/* User List Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <ApiUserList />
      </div>
    </div>
  );
}

export default Users;
