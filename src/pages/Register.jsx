import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../components/Home.module.css";
import bgImage from "../assets/background.jpg"

export default function Home() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
  setLoading(true);
  setError(""); // atau setMessage("") kalau pakai message
  try {
    await register(username, email, password); // pakai AuthContext atau service register
    setMessage("Registrasi berhasil! Silakan login.");
    setTimeout(() => {
      window.location.href = "/login"; // redirect ke login setelah sukses
    }, 1500);
  } catch (err) {
    setError(err.message); // atau setMessage(err.message)
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
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>

      <div className={styles.wrapper}>
        <div className={styles.loginSection}>
          <div className={styles.loginBox}>
            <h2 className={styles.title}>Register</h2>

            <div className={styles.inputGroup}>
              <input
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                onFocus={(e) => e.target.style.borderColor = "#9c27b0"}
                onBlur={(e) => e.target.style.borderColor = "#333"}
              />
            </div>

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
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              className={`login-btn ${styles.loginButton}`}
              onClick={handleRegister}
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
                "REGISTER"
                )}
            </button>

            <div className={styles.signupSection}>
              <span
              className={`signup ${styles.signupLink}`}
              onClick={() => navigate("/login")}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              >
              Login
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
