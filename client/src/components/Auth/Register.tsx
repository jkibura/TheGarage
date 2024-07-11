import React, { useState } from "react";
import API from "../../api";
import { useNavigate ,Link} from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "worker" | "client">("client");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, email, password, role });
      console.log("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div>
            <label><span className="material-symbols-outlined">person</span><strong>Username:</strong></label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label><span className="material-symbols-outlined">email</span><strong>Email:</strong></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label><span className="material-symbols-outlined">lock</span><strong>Password:</strong></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label><span className="material-symbols-outlined">work</span><strong>Role:</strong></label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "admin" | "worker" | "client")
              }
            >
              <option value="client">Client</option>
              <option value="worker">Worker</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="button" type="submit">Register</button>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
    </div>
  );
};

export default Register;
