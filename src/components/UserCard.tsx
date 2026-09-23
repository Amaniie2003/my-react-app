import { ExternalUser } from "../types/user";

interface UserCardProps {
  user: ExternalUser;
}

function UserCard({ user }: UserCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
          {user.name.charAt(0)}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">ID: #{user.id}</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {user.name}
      </h2>
      {user.username && (
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">@{user.username}</p>
      )}
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <span className="text-slate-600 dark:text-slate-300 truncate">{user.email}</span>
        </div>

        {user.phone && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-emerald-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <span className="text-slate-600 dark:text-slate-300">{user.phone}</span>
          </div>
        )}

        {user.company && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Company</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.company.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
