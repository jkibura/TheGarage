import React, { useState } from "react";
import api from "../../api/index";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { role } = response.data;
      // const role = response.data.role

      login(role);

      // Redirect based on user role
      switch (role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "client":
          navigate("/client/dashboard");
          break;
        case "worker":
          navigate("/worker/dashboard");
          break;
        default:
          console.error("Unknown user role:", role);
          break;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <label><span className="material-symbols-outlined">Email</span><strong>Email</strong></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label><span className="material-symbols-outlined">lock</span><strong>Password</strong></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='button'type="submit">Login</button>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </form>
     </div>   
  );
};

export default Login;
