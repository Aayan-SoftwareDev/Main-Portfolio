import { useState } from "react"
import {toast} from "react-hot-toast"
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({setIsAdmin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        if(!username || !password) {
            toast.error("Please fill all the information!");
        }
        try {
            const res = await api.post("/login", {password, username});
            if(res.status == 201 || res.status == 200){
                setIsAdmin(true);
                navigate("/admin/dashboard");
            } else {
                setIsAdmin(false);
                toast.error("Not Admin!");
                navigate("/");
            }
        } catch(e){
            console.log(e);
            toast.error("Error Occured!");
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <p className="brand">Aayan</p>
          <p>Admin login</p>
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={login}>
          {loading ? "Logging IN..." : "Log In"}
        </button>

      </div>
    </div>
  )
}

export default Login