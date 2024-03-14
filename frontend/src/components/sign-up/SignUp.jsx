import axios from "axios"
import { useEffect, useState } from "react"
import { useUserInfo } from "../../contexts/Login";
import { Navigate } from "react-router-dom";



export default function SignUp() {
    const {user , setUser , isLogged , setLogged} = useUserInfo();

    const [userInfo , setuserInfo] = useState({
        username : "",
        password : "" 
    });
    const URL = "http://localhost:4000";

    function handleChange(event) {
        console.log(event.target.name);
        // const name = event.target.name;
        // const value = event.target.value;
        const {name : name , value : value} = event.target
        setuserInfo((prevValue)=>{
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        try{
            async function getdata(){
                let response = await axios.get(URL+`/sign-up?email=${userInfo.username}&password=${userInfo.password}`); 
                // console.log(response);
                localStorage.setItem("token",response.data.token);
                setLogged(response.data.status);
                setUser(response.data.data)
            }
            getdata();
        }
        catch(err){
            console.log(err);
        }

        setuserInfo({username : "" , password : ""});
    }



    return (
        <>
            <form className="sign-in-form">
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input name="username" onChange={handleChange} value={userInfo.username} type="text" placeholder="Username" />
                </div>
                <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input name="password" onChange={handleChange} value={userInfo.password} type="password" placeholder="Password" />
                </div>
                {/* <input type="submit" value="Login" className="btn" /> */}
                <button onClick={handleSubmit} type="submit" className="btn">Register</button>
            </form>
            {
                isLogged &&   <Navigate to="/" replace={true} />
            }
        </>
    )
}




