import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

type TabType = "General" | "Security" | "Display";

export default function Setting() {
  const { logout, email } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<TabType>("General");

  const navItems: TabType[] = ["General", "Security", "Display"];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure your workspace preferences and manage your account security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8 transition-colors">
            
            {/* General Tab */}
            {activeTab === "General" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                  Account Overview
                </h2>
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Signed In Email
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {email || "eve.holt@reqres.in"}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      This is the active email associated with your current session.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "Security" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                  Security Settings
                </h2>
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    Account Authentication
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
                    Manage session security and active user credentials.
                  </p>
                  <button
                    type="button"
                    onClick={logout}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-95"
                  >
                    Sign Out Account
                  </button>
                </div>
              </div>
            )}


            {/* Display Tab */}
            {activeTab === "Display" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                  Display Preferences
                </h2>
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      Appearance Mode
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Toggle between light and dark visual themes.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                      theme === "dark"
                        ? "bg-blue-600"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                        theme === "dark" ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}