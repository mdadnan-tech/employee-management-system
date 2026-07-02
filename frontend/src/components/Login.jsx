import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
function Login()
{
    const [user,setUser] = useState({username:"",password:""});
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleClick=(e)=>{
        e.preventDefault();
        AuthService.login(user).then(res=>{
            if(res.data === true)
            {
                  localStorage.setItem("logged",true);
                  navigate("/");  
            }
            else
            {
                setError("Invalid Username and Password");   
            }
        })
    }

    return (
        <div className="container mt-5 pt-1"> 
            <div className="card mt-5 w-50 offset-3 p-5">
                <h3 className="text-center"> Login </h3>

                <label className="my-2">UserName:</label>
                <input type="text" name="username" id="username" 
                    className="form-control" autoComplete="off"
                    value={user.username}
                    onChange={(e)=> setUser({...user, username:e.target.value})}/>
                
                
                <label className="my-2">Password:</label>
                <input type="password" name="password" id="password" 
                    className="form-control" autoComplete="off"
                    value={user.password}
                    onChange={(e)=> setUser({...user, password:e.target.value})}/>

                {error  && <span className="text-danger text-center"> {error} </span>}                
                
                <button className="btn btn-primary w-100 mt-4"
                onClick={handleClick}> Login </button>
            </div>
        </div>
    )
}
export default Login;
