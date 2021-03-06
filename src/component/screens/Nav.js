import React,{useContext,useRef,useEffect,useState} from 'react'
import styled from 'styled-components'
import {ExploreIcon,HomeIcon,SearchIcon} from './Icons'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App' 
import navlogo from './../../logo/logo.png'
import NewPost from "../screens/NewPost/NewPost";
import M from 'materialize-css'


const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #FFF;
  border-bottom: 1px solid #DBDBDB;
  padding: 1rem 0;
  z-index: 10;

  .nav-logo {
    position: relative;
    top: 6px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 930px;
  }

  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }

  li {
    margin-left: 1rem;
    font-weight: 400;
  }

  @media screen and (max-width: 970px) {
    .nav {
      width: 90%;
    }
  }

  @media screen and (max-width: 670px) {
    input {
      display: none;
    }
  }
`;



const Nav = () =>{
  const searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()

  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])  
  const renderList =()=>{
    if(state){
        return[  
            // <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            <li style={{margin: "auto !important"}}  key="3"><Link to="/"><div data-target="modal1" className="modal-trigger"><SearchIcon/></div></Link></li>,
       
    
            <li key="1"><Link to="/"><HomeIcon/></Link></li>,
       
            <li>
            <NewPost />
            </li>,
            <li key="4"><Link to="/followingposts"><ExploreIcon/></Link></li>,
              <li key="2"><Link to="/profileheader">
                 <img
                  style={{
                    marginBottom: "-15px",
                    width: "24px",
                    height: "24px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                  src={state.pic}
                  alt="avatar"
                />
              </Link></li>,
        //    <li key="5">
        //    <h5  style={{color:'black',padding:"8px 15px 0 15px",fontSize:"15px",}}
        //            onClick={()=>{
        //              localStorage.clear()
        //              dispatch({type:"CLEAR"})
        //              history.push('/signin')
        //            }}>Logout</h5>
                       
                 
        //  </li>
        ]
    }else{
      return[
        <li  key="6"><Link to="/signin">Signin</Link></li>,
        <li  key="7"><Link to="/signup">Signup</Link></li>

      ]
    }
  }

  const fetchUsers = (query) =>{
    setSearch(query)
    fetch('/searchusers',{
      method:"post",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(result=>{
       console.log(result)
      setUserDetails(result.user)
    })
  }


    return (
        <NavWrapper>
      <div className="nav">
          
          <Link to={state?"/":"/signin"} className="brand-logo left">
          <img className="nav-logo" src={navlogo} alt="logo" />
          </Link>
          <ul id="nav-mobile" className="right">
           {renderList()}
          </ul>

          <div id="modal1" class="modal" ref={searchModal} style={{color: "black"}} >

          <div className="modal-content"  >
          <input style={{display: "flex"}}
                 type="text"
                 placeholder="Search"
                 value={search}
                 onChange={(e)=>{
                     fetchUsers(e.target.value)
                 }}/>
                        
            <ul className="collection" style={{display:"flex",flexDirection:"column"}}>
              {userDetails.map(item=>{
                    return  <Link to={item._id !== state._id ? `/profile/${item._id}`: "/profileheader" }         onClick={()=>{
                          M.Modal.getInstance(searchModal.current).close() 
                          setSearch("")
                          setUserDetails([])
                            }}>
                  <li className="collection-item">{item.name}</li></Link> 
              })}
            
            
            </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch("")}>Close</button>
          </div>
        </div>
   
      </div>
      </NavWrapper>
    );
}

export default Nav