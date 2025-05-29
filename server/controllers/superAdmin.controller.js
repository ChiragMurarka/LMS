import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";




export const getSuperAdminDashboard = async (req, res) => {
    try {
        const courses=await Course.find();
        const users=await User.find({role:"student"});
        const instructors=await User.find({role:"instructor"});

         let revenue=0;
        courses.map((course)=>{
            revenue=revenue+(course?.enrolledStudent.length*course?.coursePrice);
        })
        return res.status(200).json({
            success:true,
            data:{
                revenue,
                totalcourses:courses.length,
                users,
                instructors
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get All Courses",
            sucess: false
        })
    }
}