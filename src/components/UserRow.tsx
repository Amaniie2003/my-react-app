// src/components/UserRow.tsx
import React from "react";
import { User } from "../types/user";

interface UserRowProps {
  user: User;
  onSelect?: (id: number) => void;
}

export const UserRow = React.memo(function UserRow({ user, onSelect }: UserRowProps) {
  return (
    <div 
      onClick={() => onSelect?.(user.id)}
      className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 font-bold group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
          {user.first_name.charAt(0)}{user.last_name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>
      <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
});
