import { useState, useEffect } from "react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onAutoFillDemo?: (email: string, password: string) => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  initialEmail = "",
  onAutoFillDemo,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initial email when opened
  useEffect(() => {
    if (isOpen) {
      setEmail(initialEmail || "eve.holt@reqres.in");
      setIsSubmitted(false);
      setErrorMessage("");
    }
  }, [isOpen, initialEmail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleUseDemo = () => {
    if (onAutoFillDemo) {
      onAutoFillDemo("eve.holt@reqres.in", "cityslicka");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4 shadow-lg shadow-blue-500/10">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Reset Password
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Enter your registered email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-bold flex items-center gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    autoFocus
                    className="w-full pl-12 pr-4 py-3.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition duration-200 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Demo Notice Box */}
              <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-blue-900 dark:text-blue-300">
                      💡 Demo Credentials
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Email: <code className="font-mono text-blue-600 dark:text-blue-400">eve.holt@reqres.in</code>
                      <br />
                      Password: <code className="font-mono text-blue-600 dark:text-blue-400">cityslicka</code>
                    </p>
                  </div>
                  {onAutoFillDemo && (
                    <button
                      type="button"
                      onClick={handleUseDemo}
                      className="shrink-0 text-xs font-bold px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
                    >
                      Autofill
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-blue-400 text-white text-sm font-extrabold rounded-2xl shadow-xl shadow-blue-500/25 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>

              {/* Back to sign in */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-5 shadow-lg shadow-emerald-500/10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Reset Link Sent!
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              We've dispatched password reset instructions to:
              <br />
              <strong className="text-slate-900 dark:text-slate-200 font-semibold">{email}</strong>
            </p>

            <div className="my-6 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              Please check your inbox or spam folder. If you don't receive an email within 2 minutes, try resending.
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-extrabold rounded-2xl shadow-xl shadow-blue-500/25 transition duration-200 cursor-pointer"
              >
                Back to Sign In
              </button>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition"
              >
                Send to another email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
