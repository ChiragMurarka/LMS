import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { uploadPdf } from "../utils/cloudinary.js";
import { Request } from "../models/request.model.js";



export const getSuperAdminDashboard = async (req, res) => {
    try {
        const courses = await Course.find();
        const users = await User.find({ role: "student" });
        const instructors = await User.find({ role: "instructor" });

        let revenue = 0;
        courses.map((course) => {
            revenue = revenue + (course?.enrolledStudent.length * course?.coursePrice);
        })
        return res.status(200).json({
            success: true,
            data: {
                revenue,
                totalcourses: courses.length,
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



export const createReq = async (req, res) => {
    try {
        const {education,experience}=req.body;

        if(education==""||experience==""){
            return res.status(400).json({
                success:false,
                message:"Education & Experience Required"
            })
        }
        const resume=req.file ;
        if(!resume){
            return res.status(400).json({
                success:false,
                message:"Resume is required"
            })
        }
        let insResume=await uploadPdf(resume.path,resume.originalname);


        //console.log(insResume);
       
        if(!insResume){
            return res.status(400).json({
                success:false,
                message:"Problem Uploading Resume"
            })
        }


       const request=await Request.create({
        userId:req.id,
        education,
        yoe:experience,
        resume:insResume.secure_url,
        rejectedMsg:""
       })
       //console.log(request);
       return res.status(200).json({
        success:true,
        message:"Request Sent"
       })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Send Request",
            sucess: false
        })
    }
}



export const getPendingRequests = async(req,res)=>{

    try {
        const requests=await Request.find({status:"underreview"});
        return res.status(200).json({
            success:true,
            requests
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Get Requests",
            success: false
        })
    }
    
}