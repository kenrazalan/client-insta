import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../../App'
import M from 'materialize-css'

const Login = () =>{
    const {state,dispatch} =useContext(UserContext)

    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [load,setLoad] = useState(true)

    const PostData =() =>{
       
        fetch("/signin",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                
                M.toast({html: data.error, classes:"#e53935 red darken-1"});
                setLoad(true)
            }else{
               
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signed success",classes:"#66bb6a green lighten-1"})
                history.push('/')
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <input
                 type="text"
                 placeholder="email"
                 value={email.toLowerCase()}
                 onChange={(e)=>{
                     setEmail(e.target.value)
                 }}/>
                 <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>{
                     setPassword(e.target.value)
                 }}/>
                 {load?
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                 onClick={()=>{PostData(); setLoad(false)}}>
                   Login
                </button> :<button className="buttonload">
  <i className="fa fa-spinner fa-spin"></i>Loading
</button> }
                <h5>
                    <Link to="/signup">Dont have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot password?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login