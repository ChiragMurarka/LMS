import { useGetCourseDetailsWithPurchaseStatusQuery } from "@/features/api/coursePurchaseApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export const ProtectedRoute=({children})=>{
    const {isAuthenticated}=useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login/"/>
    }

    return children;
}

export const CoursePurchased=({children})=>{
  const {isAuthenticated}=useSelector(store=>store.auth);

  const params=useParams();
  const {courseId}=params;

  
  const { data, isLoading, isError, refetch } = useGetCourseDetailsWithPurchaseStatusQuery({courseId});
  
  if(!isAuthenticated){
    return <Navigate to="/login/"/>
  }

  if(isLoading){
    return <LoadingSpinner/>
  }
  if(isError){
    return <h1>Error getting Course Progress</h1>
  }

  const coursePurchased =data?.purchased;
  console.log(data);
  if (!coursePurchased) {
    return <Navigate to={`/course-details/${courseId}`} />;
  }
  
  return children ;
}


export const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth);
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    useEffect(() => {
      if (isAuthenticated) {
        setTimeout(() => {
          setShouldRedirect(true);
        });                       
                                    
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

export const SuperAdminGuard=({children})=>{
  const {user,isAuthenticated}=useSelector(store=>store.auth);

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }

  if(!user){
    return null;      //renders nothing until user is fetched
  }

  if(user.role==="superadmin"){
    return <Navigate to="/superadmin/dashboard"/>
  }
  return children;
}


export const ChatRoute=({children})=>{
  const {user,isAuthenticated}=useSelector(store=>store.auth);


  const params=useParams();
  const {courseId}=params;

  
  const { data, isLoading, isError, refetch } = useGetCourseDetailsWithPurchaseStatusQuery({courseId});
  
  if(!isAuthenticated){
    return <Navigate to="/login/"/>
  }

  if(isLoading){
    return <LoadingSpinner/>
  }
  if(isError){
    return <h1>Error getting Course Progress</h1>
  }

  const coursePurchased =data?.purchased;
  console.log(data);
  if (!coursePurchased && user.role!=="superadmin") {
    return <Navigate to={`/course-details/${courseId}`} />;
  }
  
  return children ;
}