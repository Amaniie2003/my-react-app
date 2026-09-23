import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { User, SupportInfo } from "../types/user";

interface UserDetailModalProps {
  userId: number | null;
  initialUser?: User | null;
  onClose: () => void;
}

// In-memory cache to make repeated clicks 100% instant
const userDetailCache = new Map<number, { user: User; support: SupportInfo | null }>();

export default function UserDetailModal({ userId, initialUser, onClose }: UserDetailModalProps) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [support, setSupport] = useState<SupportInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setSupport(null);
      return;
    }

    // 1. For newly created mock users (ID not in Reqres API 1-12)
    if (userId > 12) {
      setUser(null);
      setSupport(null);
      setLoading(false);
      setError(`User with ID ${userId} is a newly created mock user. Details cannot be fetched via API.`);
      return;
    }

    // 2. If cached, display instantly!
    if (userDetailCache.has(userId)) {
      const cached = userDetailCache.get(userId)!;
      setUser(cached.user);
      setSupport(cached.support);
      setLoading(false);
      setError("");
      return;
    }

    // 3. For existing API users (1-12), fetch and cache
    setLoading(true);
    setError("");
    setUser(initialUser || null);

    apiClient
      .get(`/users/${userId}`)
      .then((response) => {
        const fetchedUser: User = response.data.data;
        const fetchedSupport: SupportInfo = response.data.support;
        setUser(fetchedUser);
        setSupport(fetchedSupport);
        userDetailCache.set(userId, { user: fetchedUser, support: fetchedSupport });
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setUser(null);
          setError(`User with ID ${userId} is a newly created mock user. Details cannot be fetched via API.`);
        } else {
          setError("Failed to fetch user details.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, initialUser]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header/Close */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-8">Profile Details</h3>

            {loading && (
              <div className="py-12 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500">Fetching user information...</p>
              </div>
            )}

            {error && (
              <div className="py-8 px-6 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            {user && (
              <div className="w-full space-y-6">
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur opacity-40 animate-pulse" />
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="relative w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-xl"
                  />
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {user.first_name} {user.last_name}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Verified Account</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">User ID</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">#{user.id}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                  </div>
                </div>

                {support && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-left">
                    <p className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" /></svg>
                      Platform Note
                    </p>
                    <p className="text-xs text-blue-800/70 dark:text-blue-300/60 leading-relaxed italic">
                      "{support.text}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
