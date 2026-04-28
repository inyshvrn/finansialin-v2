// Login.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../style/login.css";

import { apiPost } from "@/lib/apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [resetLink, setResetLink] = useState("");
  const router = useRouter();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwdOkLen = password.length >= 6;
  const pwdOkNum = /\d/.test(password);

  // Trigger animations on mount to ensure consistency on logout redirect
  useEffect(() => {
    // Force reflow to restart animations
    const loginPage = document.querySelector('.login-page');
    if (loginPage) {
      loginPage.offsetHeight;
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiPost('/api/auth/login', { email, password });

      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      if (!accessToken) {
        setError("Invalid token from server");
        return;
      }

      localStorage.setItem("access_token", accessToken);

      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (err) {
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");
    setResetLink("");
    setForgotLoading(true);

    try {
      const data = await apiPost('/api/auth/forgot-password', { email: forgotEmail });

      const token = data?.reset?.token;
      if (token) {
        const link = `/reset-password?email=${encodeURIComponent(forgotEmail)}&token=${encodeURIComponent(token)}`;
        setResetLink(link);
        setForgotMessage("Reset token available. You can continue to reset password now.");
      } else {
        setForgotMessage("Password reset link has been sent to your email!");
      }
      setForgotEmail("");

      if (!token) {
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotMessage("");
        }, 2000);
      }
    } catch (err) {
      setForgotError(err.message || "Failed to send reset email");
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setForgotMessage("");
    setForgotError("");
    setResetLink("");
  };

  return (
    <div className="login-page">
      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={closeForgotModal}>
          <div className="modal-forgot" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeForgotModal}>×</button>

            <h2>Reset Password</h2>
            <p>Enter your email address and we`ll send you a link to reset your password.</p>

            {forgotError && (
              <div className="modal-error">
                {forgotError}
              </div>
            )}

            {forgotMessage && (
              <div className="modal-success">
                {forgotMessage}
              </div>
            )}

            {resetLink && (
              <button
                type="button"
                className="modal-btn"
                onClick={() => router.push(resetLink)}
                style={{ marginBottom: "1rem" }}
              >
                Open Reset Password Page
              </button>
            )}

            <form onSubmit={handleForgotSubmit} className="forgot-form" autoComplete="off">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                disabled={forgotLoading}
                autoComplete="off"
                inputMode="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                name="forgot-email"
              />

              <button type="submit" className="modal-btn" disabled={forgotLoading}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="login-left">
        <div className="auth-illustration-wrap">
          <div className="auth-logo" aria-label="Finansialin logo">FI</div>
        </div>
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details <br /> and start journey with us</p>
        <Link href="/register" className="btn-signup-login">
          Sign Up
        </Link>
      </div>

      <div className="login-right">
        <h1 className="brand">Finansialin</h1>
        <p className="subtitle">Log in to continue</p>

        {error && (
          <div className="error-message" style={{
            background: '#fee',
            border: '1px solid #fcc',
            color: '#c33',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            autoComplete="off"
            inputMode="email"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            name="login-email"
          />
          {emailFocused && (
            <small className={`input-hint ${emailValid ? 'ok' : (email.length > 0 ? 'warn' : '')}`}>
              Use a valid email like name@example.com
            </small>
          )}

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              autoComplete="new-password"
              name="login-password"
            />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-eye">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.5 7.5 7.5 4.5 12 4.5s8.5 3 9.75 7.5c-1.25 4.5-5.25 7.5-9.75 7.5s-8.5-3-9.75-7.5z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-eye">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.5 12c1.25 4.5 5.25 7.5 9.75 7.5 1.99 0 3.84-.57 5.39-1.55M10.5 6.75A10.45 10.45 0 0112 6.5c4.5 0 8.5 3 9.75 7.5-.39 1.42-1.11 2.71-2.09 3.79M3 3l18 18" />
                </svg>
              )}
            </span>
          </div>
          {passwordFocused && (
            <div className="hint-list">
              <div className={pwdOkLen ? 'ok' : 'warn'}>• Minimum 6 characters</div>
              <div className={pwdOkNum ? 'ok' : 'warn'}>• Include at least 1 number</div>
            </div>
          )}

          <button type="submit" className="btn-loginsignin" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
          <button
            type="button"
            className="forgot-password"
            onClick={() => setShowForgotModal(true)}
          >
            Forgot your password?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;