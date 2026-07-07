import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { userAPI } from "../api/api";
import { useToast } from "../context/ToastContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await userAPI.signup({
        username: formData.name,
        email_id: formData.email,
        password: formData.password
      });

      setIsLoading(false);
      if (response && response.success) {
        addToast("Workspace initialized successfully!", "success");
        navigate("/login");
      } else {
        const errorMsg = response?.message || "Signup failed";
        setError(errorMsg);
        addToast(errorMsg, "error");
      }
    } catch (err) {
      setIsLoading(false);
      const errorMsg = err.response?.data?.message || err.message || "An error occurred during signup";
      setError(errorMsg);
      addToast(errorMsg, "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await userAPI.googleAuth({ idToken });

      setIsLoading(false);
      if (response && response.success) {
        addToast("Google account registered successfully!", "success");
        navigate("/login");
      } else {
        const errorMsg = response?.message || "Google sign-up failed";
        setError(errorMsg);
        addToast(errorMsg, "error");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.code === "auth/popup-closed-by-user") return;
      const errorMsg = err.response?.data?.message || err.message || "Google sign-up failed";
      setError(errorMsg);
      addToast(errorMsg, "error");
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Left Panel - Dark Branding Side */}
      <div className="hidden lg:flex w-1/2 bg-[#0f172a] text-white flex-col justify-between p-12 xl:p-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start space-y-8">
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-black tracking-widest uppercase">Advance Website development </span>
            <span className="text-primary text-3xl leading-none">.</span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest text-slate-400 uppercase border border-slate-700 rounded-full px-3 py-1.5 bg-slate-800/50">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>ISO 9001:2015 Certified Secure</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl xl:text-6xl font-black uppercase tracking-tight leading-[1.1]">
            Deploy infrastructure <br />
            with confidence.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
            Register your workspace to provision fleet nodes, configure user access, and centralize your enterprise printing architecture.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-4 border-t border-slate-800 pt-8 mt-12">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-xs border-2 border-[#0f172a]">C1</div>
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-bold text-xs border-2 border-[#0f172a]">C2</div>
            <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center font-bold text-xs border-2 border-[#0f172a]">C3</div>
          </div>
          <div className="text-xs font-bold tracking-widest uppercase text-slate-400 leading-tight">
            Trusted by 420+ <br />
            Institutional Clients
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 relative overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-8 my-auto">

          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center space-x-1 mb-12">
            <span className="text-2xl font-black tracking-widest uppercase text-foreground">Advance Website development </span>
            <span className="text-primary text-3xl leading-none">.</span>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest uppercase text-primary">Workspace Registration</div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-foreground">Get Started.</h2>
            <p className="text-muted-foreground font-medium text-sm">
              Initialize your administrative access and configure fleet nodes.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold tracking-widest uppercase text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-foreground ml-1">Administrator Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-foreground ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@institution.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-foreground ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary transition-all font-medium font-mono tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-foreground ml-1">Confirm Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-primary transition-all font-medium font-mono tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-4 px-4 mt-2 rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all font-bold tracking-widest uppercase text-sm shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Initialize Workspace
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Or Register With</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl border-2 border-border bg-card hover:bg-muted transition-colors font-bold tracking-widest uppercase text-xs text-foreground disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Google Account</span>
          </button>

          <div className="text-center pt-6">
            <p className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
              Already configured?{" "}
              <Link to="/login" className="text-foreground hover:text-primary transition-colors border-b border-foreground hover:border-primary pb-0.5">
                Establish Connection
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
