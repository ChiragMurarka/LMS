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

  if(!isAuthenticated){
    return <Navigate to="/login/"/>
  }

  const { data, isLoading, isError, refetch } = useGetCourseDetailsWithPurchaseStatusQuery({courseId});


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