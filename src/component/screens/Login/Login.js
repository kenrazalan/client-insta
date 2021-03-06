import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../../App'
import M from 'materialize-css'
import styled from 'styled-components'

const Wrapper = styled.div`
    .auth-card{
        border: 1px solid #DBDBDB !important;
        box-shadow: none !important;
    }
    .login-input{
  
        border-radius: 4px !important;
        border: 1px solid #DBDBDB !important;
        padding: 0.1rem 0.5rem !important;
        width: 95% !important;
        height: 2rem !important;
    }
    .no-account{
    
       color: #0095f6!important;
       font-weight: 600;
    }
    .reset{
        font-size: 0.8em;
        
        font-weight: 100 !important;
    }
    .brand-logo{
        font-family: 'Grand Hotel', cursive ;
      }
    button{
        font-weight: 600 !important;
        width: 100% !important;
        margin-bottom: 2em;
    }
`
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
                // M.toast({html: "Signed  success",classes:"#66bb6a green lighten-1"})
                history.push('/')
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
        <Wrapper>
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <input
                className="login-input"
                 type="text"
                 placeholder="email"
                 value={email.toLowerCase()}
                 onChange={(e)=>{
                     setEmail(e.target.value)
                 }}/>
                 <input
                   className="login-input"
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
                <div style={{marginTop: "1em"}}>
                   Dont have an account? <Link className="no-account" to="/signup">Sign up</Link>
                </div>
                <div>
                    <Link className="reset" to="/reset">Forgot password?</Link>
                </div>
            </div>
        </div>
        </Wrapper>
    )
}

export default Login