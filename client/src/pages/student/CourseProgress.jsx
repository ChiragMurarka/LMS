import LoadingSpinner from '@/components/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useGetCourseProgressQuery, useMarkAsCompletedMutation, useMarkAsInCompleteMutation, useUpdateLectureProgressMutation } from '@/features/api/courseProgressApi';
import { current } from '@reduxjs/toolkit';
import { CheckCircle2, CirclePlay, MessageCircleCode, XCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseProgress = () => {
    const params = useParams();
    const courseId = params.courseId;
    const { data, isLoading, isError, refetch } = useGetCourseProgressQuery({ courseId });
    const [markAsCompleted, { isError: isErr, error, data: completedData, isSuccess: isCompletedSuccess }] = useMarkAsCompletedMutation();
    const [markAsIncomplete, { data: incompletedData, isSuccess: isIncompletedSuccess }] = useMarkAsInCompleteMutation();
    const [updateLectureProgress] = useUpdateLectureProgressMutation();



    const [currentLecture, setCurrentLecture] = useState(null);






    useEffect(() => {
        if (isErr) {
            toast.error(error.data.message || "Complete atleast one Video to mark completed")
        }
        if (isCompletedSuccess) {
            toast.success(completedData.message);
        }
    }, [isErr, error, isCompletedSuccess])

    useEffect(() => {
        if (isIncompletedSuccess) {
            toast.error(incompletedData.message);
        }
    }, [isIncompletedSuccess])


    //useEffect is always before return any jsx and all otherwise render more hooks than previous hooks error

    
    if (isLoading ) return <LoadingSpinner />
    if (isError) return <p>Failed to load course details</p>

    console.log(data);

    const { courseDetails, progress, completed } = data?.data;
    const { courseTitle } = courseDetails;


    const initialLecture = currentLecture || courseDetails?.lectures && courseDetails?.lectures[0];


    //this .some() finds atleast one matching in array accroding to given condition
    const isLectureCompleted = (lectureId) => {
        return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
    }

    const handleLectureProgress = async (lectureId) => {
        await updateLectureProgress({ courseId, lectureId });
        refetch();
    }

    const handleSelectLecture = (lecture) => {
        setCurrentLecture(lecture);
        //handleLectureProgress(lecture._id);
    };

    const markCompleteHandler = async () => {
        await markAsCompleted({ courseId: courseDetails._id });
        refetch();
    }

    const markInCompleteHandler = async () => {
        await markAsIncomplete({ courseId: courseDetails._id });
        refetch();
    }





    const navigate = useNavigate();
    return (
        <div className='max-w-7xl mx-auto p-4 mt-20'>
            {/*Display Course name*/}
            <div className='flex justify-between mb-4'>
                <h1 className='text-2xl font-bold'>{courseDetails.courseTitle}</h1>
                <div className='flex gap-3'>
                    <div>
                        <Button onClick={() => navigate(`/discussion-forum/${courseId}`)}>
                            <MessageCircleCode className='text-white' />
                            <span>Discussion Forum</span>
                        </Button>
                    </div>
                    {
                        !completed ? (<Button className="hover:bg-green-400" onClick={markCompleteHandler}><CheckCircle2 className='text-white' /><span>Completed</span></Button>) :
                            (<Button className="hover:bg-red-600" onClick={markInCompleteHandler}><XCircleIcon className='text-white' /><span>Incomplete</span></Button>)
                    }
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-6'>
                {/* video section */}
                <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
                    <div>
                        <video
                            src={currentLecture?.videoUrl || initialLecture.videoUrl}
                            controls
                            className='w-full h-auto md:rounded-lg'
                            onEnded={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
                        >
                        </video>
                    </div>
                    <div>
                        {/* Display current watching Lecture  */}
                        <div className='mt-2'>
                            <h3 className='font-medium text-lg'>{currentLecture?.lectureTitle || initialLecture.lectureTitle}</h3>
                        </div>
                    </div>
                </div>
                {/* lecture sidebar  */}
                <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
                    <h2 className='font-semibold text-xl mb-4'>
                        Course Lecture
                    </h2>
                    <div className='flex-1 overflow-y-auto'>
                        {
                            courseDetails?.lectures.map((lecture, idx) => (
                                <Card key={idx} onClick={() => handleSelectLecture(lecture)} className={`mb-3 cursor-pointer transition  transform ${lecture._id === (currentLecture?._id || initialLecture._id) ? "bg-gray-300 dark:bg-gray-700" : "bg-gray-100"}`}>
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div className='flex items-center'>
                                            {
                                                isLectureCompleted(lecture._id) ? (<CheckCircle2 size={24} className="text-green-500 mr-2" />) : (<CirclePlay size={24} className="text-blue-500 mr-2" />)
                                            }
                                            <div>
                                                <CardTitle className="text-lg font-medium dark:text-black">{lecture.lectureTitle}</CardTitle>
                                            </div>
                                        </div>{
                                            isLectureCompleted(lecture._id) && <Badge variant={"outline"} className="bg-green-200 text-green-600">Completed</Badge>
                                        }
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseProgress