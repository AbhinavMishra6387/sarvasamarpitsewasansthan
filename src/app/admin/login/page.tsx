"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import { ORG_DETAILS } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sarvasamarpit.org");
  const [password, setPassword] = useState("Admin@SSSS2026!");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ngo-dark-900 via-ngo-dark-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-t-4 border-ngo-orange space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ngo-orange-600 to-ngo-orange-400 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
            ॐ
          </div>
          <h2 className="text-2xl font-heading font-black text-gray-900">
            Admin CMS Portal
          </h2>
          <p className="text-xs text-gray-500">
            {ORG_DETAILS.name} &bull; Prayagraj
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-ngo-orange"
              />
            </div>
          </div>

          <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-[11px] text-gray-600 space-y-1">
            <p className="font-bold text-ngo-orange-800">Default Super Admin Credentials:</p>
            <p>Email: <code className="bg-white px-1.5 py-0.5 rounded border">admin@sarvasamarpit.org</code></p>
            <p>Password: <code className="bg-white px-1.5 py-0.5 rounded border">Admin@SSSS2026!</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-ngo-orange hover:bg-ngo-orange-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Secure Dashboard"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-ngo-orange transition-colors"
          >
            &larr; Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
