import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../components/Home.module.css";
import bgImage from "../assets/background2.jpg"

export default function Home() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password); // pakai AuthContext
      window.location.href = "/dashboard"; // redirect setelah login sukses
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (e) => {
    if (e.target.classList.contains("login-btn")) {
      e.target.style.background = "#333";
      e.target.style.color = "white";
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
    }
  };

  const handleMouseLeave = (e) => {
    if (e.target.classList.contains("login-btn")) {
      e.target.style.background = "white";
      e.target.style.color = "#333";
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "none";
    }
  };

  const handleLinkHover = (e, isHover) => {
    e.target.style.color = isHover ? "#9c27b0" : (e.target.classList.contains("signup") ? "#333" : "#555");
  };

  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>
        <div className={styles.loginSection}>
          <div className={styles.loginBox}>
            <h2 className={styles.title}>LOGIN</h2>

            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                onFocus={(e) => e.target.style.borderColor = "#9c27b0"}
                onBlur={(e) => e.target.style.borderColor = "#333"}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                onFocus={(e) => e.target.style.borderColor = "#9c27b0"}
                onBlur={(e) => e.target.style.borderColor = "#333"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleButton}
              >
                {showPassword ? '⌣' : '👁️'}
              </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className={styles.forgotPassword}>
              <span
                className={styles.forgotLink}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                Forgot password?
              </span>
            </div>

            <button
              className={`login-btn ${styles.loginButton}`}
              onClick={handleLogin}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              disabled={loading}
            >
              {loading ? (
          <>
                    Loading
                    <span className={styles.spinner}></span>
                </>
                ) : (
                "LOGIN"
                )}
            </button>

            <div className={styles.signupSection}>
              <span
                className={`signup ${styles.signupLink}`}
                onClick={() => navigate("/register")}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
              >
                SIGN UP
              </span>
            </div>
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.colorOverlay}></div>
          <img
            src={bgImage}
            alt="Mount Fuji Sunset"
            className={styles.image}
          />
          <div className={styles.overlay}></div>
        </div>
      </div>
    </div>
  );
}
