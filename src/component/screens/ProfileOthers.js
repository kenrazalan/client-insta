import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { CloseIcon,PostIcon,SavedIcon} from "./Icons";
import {UserContext} from '../../App'
import {useParams,useHistory, Link} from 'react-router-dom'
import Loader from './Loader'
import Modal from './Modal'

const WrapperPost = styled.div`
margin-top: 1rem;
cursor: pointer;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 1.5rem;

img {
    border-radius: 4px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    width: 300px;
    height: 300px;
    object-fit: cover;
}

.container-overlay {
    position: relative;
}

.container-overlay:hover .overlay {
    display: block;
}

.overlay {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 300px;
    height: 300px;
    z-index: 4;
    display: none;
}

.overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #FFF";
    font-weight: 500;
    font-size: 1.1rem;
}

svg {
    fill: #FFF";
    position: relative;
    top: 4px;
}

span {
    display: flex;
    display: block;
    align-items: center;
    padding-right: 0.5rem;
}

span:first-child {
    margin-right: 1rem;
}

@media screen and (max-width: 1000px) {
    img, .overlay {
    width: 233px;
    height: 233px;
}

@media screen and (max-width: 800px) {
    img, .overlay {
    width: 200px;
    height: 200px;
}

@media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;

    img, .overlay {
        height: 240px;
        width: 100%;
}

@media screen and (max-width: 500px) {
    grid-gap: 1rem;

    img, .overlay {
        height: 200px;
        width: 100%;
}

@media screen and (max-width: 400px) {
    img, .overlay {
        height: 170px;
        width: 100%;
}
}
`;

const Wrappers = styled.div`

  .profile-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
  }

  .profile-tab div {
    display: flex;
    cursor: pointer;
    margin-right: 3rem;
  }

  .profile-tab span {
    padding-left: 0.3rem;
  }

  .profile-tab svg {
    height: 24px;
    width: 24px;
  }

  hr {
    border: 0.5px solid #DBDBDB;
  }
`;




const MobileWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  padding-left: 1rem;

  .mobile-profile-stats span {
    padding-right: 1rem;
  }

  .mobile-bio,
  .mobile-profile-stats {
    display: none;
  }

  @media screen and (max-width: 645px) {
    .mobile-bio {
      display: block;
    }

    .mobile-profile-stats {
      display: block;
      margin-bottom: 0.4rem;
    }
  }

  a {
    color: #0095F6;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 2rem;
 

  .avatar {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 90px;
    margin-right: 2rem;
  }

  .profile-meta {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .profile-meta h2 {
    position: relative;
    top: 3px;
  }

  .profile-stats {
    display: flex;
    margin-bottom: 1rem;
  }

  .options svg {
    position: relative;
    top: 7px;
    margin-left: 1rem;
  }

  span {
    padding-right: 1rem;
  }

  a {
    color: #0095F6;
  }

  @media screen and (max-width: 645px) {
    font-size: 1rem;

    .bio,
    .profile-stats {
      display: none;
    }

    .avatar {
      width: 140px;
      height: 140px;
    }

    .profile-meta {
      flex-direction: column;
    }

    button {
      margin-left: 0;
    }

  

  @media screen and (max-width: 420px) {
    font-size: 0.9rem;

    .avatar {
      width: 100px;
      height: 100px;
    }
  }
`;

const modalHeaderStyle = {
  display: "flex" ,
  alignItems: "center" ,
  justifyContent: "space-between",
  borderBottom: "1px solid #DBDBDB",
  padding: "1rem",
};

const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem ;
  padding-right: 2rem ;
  font-size: 0.9rem ;
  width: 350px ;

  img {
    width: 40px !important;
    object-fit: cover !important;
    height: 40px !important;
    border-radius: 20px !important;
    margin-right: 1rem !important;
  }

  .profile-info {
    display: flex !important;
  }

  span {
    color: #B2B2B2 !important;
  }

  button {
    font-size: 0.9rem !important;
    position: relative !important;
    top: -10px !important;
  }

  @media screen and (max-width: 480px) {
    width: 340px !important;
  }
`;

const ModalContent = ({ loggedInUser, users, closeModal, title,follow,unfollow }) => {
  const history = useHistory();
//   const[shFollow,setShFollow] = useState(true)
 //  useEffect(()=>{
//     setShFollow(loggedInUser && !loggedInUser.following.includes(users._id))
 //},[users])
  console.log(users)
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <div style={{display: "flex", alignItems: "center" ,
  justifyContent: "space-between",
  borderBottom: "1px solid #DBDBDB",
  padding: "1rem"}}>
        <div>{title}</div>
        <CloseIcon onClick={closeModal} />
      </div>
      {users.map((user) => (
        
        <ModalContentWrapper key={user._id}>
          <div className="profile-info">
            <img
              className="pointer"
              onClick={() => {
                closeModal();
                history.push(`/${user.username}`);
              }}
               src={loggedInUser._id==user._id?loggedInUser.pic:user.pic}
              // src={user.pic}
              alt="avatar"
            />
            <div className="user-info">
              <div
                className="pointer"
                onClick={() => {
                  closeModal();
              
                }}
              >
                <Link to={loggedInUser._id==user._id?`/profileheader`:`/profile/${user._id}`}>{user.username}</Link>
              </div>
              <span>{user.name}</span>
            </div>
          </div>
          {/* {loggedInUser._id!==user._id?
          <div className="options">
              {shFollow?
                <Button onClick={()=>follow(user._id)}>Follow</Button>
                :
                <Button onClick={()=>unfollow(user._id)}>Unfollow</Button>
                }
              </div>: <div>You</div>} */}
        </ModalContentWrapper>
      ))}
    </div>
  );
};


 

const ProfileOthers = (props) => {
  const [userProfile,setProfile] =useState(null)

  const [showFollowersModal, setFollowersModal] = useState(false);
  const [showFollowingModal, setFollowingModal] = useState(false);
  
  const closeModal = () => {
    setFollowersModal(false);
    setFollowingModal(false);
  };


  const {state,dispatch}= useContext(UserContext)
  const {userid}= useParams()
  // const [showFollow,setShowfollow] =useState(state?!state.following.includes(userid):true)

  const [showFollow,setShowfollow] =useState(true)
  const userId = props.match.params.userid
  console.log(userProfile)
  useEffect(()=>{
      // setShowfollow(state && !state.following.includes(userId))
       setShowfollow(state && !state.following.some(i=> i._id==userid))
  },[state])

  useEffect(()=>{
    fetch(`/user/${userId}`,{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then((result)=>{
        console.log(result)
        setProfile(result)
    })
},[])


const followUser = ()=>{
    fetch("/follow",{
        method:"put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId: userId
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        dispatch({type:"UPDATE",payload: {following:data.following, followers: data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
 
        setProfile(prevState=>{
        
            return {
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:[...prevState.user.followers,data]
                   }
            }
        })
         setShowfollow(false)
    })
}


const unfollowUser = ()=>{
    fetch("/unfollow",{
        method:"put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            unfollowId: userId
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        dispatch({type:"UPDATE",payload: {following:data.following, followers: data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        
        setProfile(prevState=>{
            const newFollower  = prevState.user.followers.filter(item=>item._id!== data._id)
            return {
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:newFollower
                   }
            }
        })
        setShowfollow(true)
    })
}

  return (
    <>
    {userProfile?
    <Wrappers>
      <Wrapper>
        <img className="avatar" src={userProfile.user.pic} alt="avatar" />
        <div className="profile-info">
          <div className="profile-meta">
            <h5 className="pointer">@<span className="bold">{userProfile.user.username}</span></h5>
              <div className="options">
              {showFollow?
                <Button onClick={()=>followUser()}>Follow</Button>
                :
                <Button onClick={()=>unfollowUser()}>Unfollow</Button>
                }
              </div>
          </div>

          <div className="profile-stats">
            <span>{userProfile.posts.length} posts</span>

            <span className="pointer" onClick={() => setFollowersModal(true)}>
              {userProfile.user.followers.length} followers
            </span>

            <span className="pointer" onClick={() => setFollowingModal(true)}>
              {userProfile.user.following.length} following
            </span>

            
            {showFollowersModal && userProfile.user.followers.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={userProfile.user.followers}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
            {showFollowingModal && userProfile.user.following.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={userProfile.user.following}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
    
          </div>
          <div className="bio">
            <span className="bold">{userProfile.user.name}</span>
           
          </div>
        
        </div>
      </Wrapper>
      <MobileWrapper>
        <div className="mobile-profile-stats">
          <span>{userProfile.posts.length} posts</span>

          <span className="pointer" onClick={() => setFollowersModal(true)}>
            {userProfile.user.followers.length} followers
          </span>

          <span className="pointer" onClick={() => setFollowingModal(true)}>
            {userProfile.user.following.length} following
          </span>
          {showFollowersModal && userProfile.user.followers.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={userProfile.user.followers}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
            {showFollowingModal && userProfile.user.following.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={userProfile.user.following}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}

        
        </div>
        <div className="mobile-bio">
          <span className="bold">{userProfile.user.name}</span>
        </div>
      </MobileWrapper>
      <hr />

      <div className="profile-tab">
        <div

        >
          <PostIcon />
          <span>Posts</span>
        </div>
        <div
        >
          <SavedIcon />
          <span>Saved</span>
        </div>
      </div>
   
    <WrapperPost>
      {userProfile.posts.map((item) => (
        <div
          key={item._id}
          className="container-overlay"
        >
          <img src={item.photo} alt="post" />
        </div>
      ))}
    </WrapperPost>


      </Wrappers>
     : <Loader/>}
    </>
  );
};

export default ProfileOthers;
