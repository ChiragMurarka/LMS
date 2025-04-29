import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute=({children})=>{
    const {isAuthenticated}=useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login/"/>
    }

    return children;
}




export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth);
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    useEffect(() => {
      if (isAuthenticated) {
        setTimeout(() => {
          setShouldRedirect(true);
        },1);                       //1ms fake delay is added because what was happening is that when we login
                                    //it comes here and this becomes true 
      }
    }, [isAuthenticated]);
  
    if (shouldRedirect) {
      return <Navigate to="/" />;
    }
  
    return children;
  };


export const AdminRoute =({children})=>{
    const {user,isAuthenticated}=useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login/"/>
    }

    if(user.role!=="instructor"){
        return <Navigate to="/"/>
    }
    return children;
}