import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSendInstructorRequestMutation } from '@/features/api/superAdminApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const Careers = () => {


    const {user}=useSelector(store=>store.auth) ;
    const [sendInstructorRequest,{data,isLoading,isSuccess,isError,error}]=useSendInstructorRequestMutation();

    const [input,setInput]=useState({
        education:"",
        experience:"",
        resume:null
    })
    
    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message);
        }
        if(isError){
            toast.error(error.data.message||"Error Sending Request")
        }
    },[isSuccess,isError])


    const sendHandler =async()=>{
        const formData=new FormData();
        formData.append("education",input?.education);
        formData.append("resume",input?.resume);
        formData.append("experience",input?.experience);


        await sendInstructorRequest({data:formData});
    }

    const changeHandler=(event)=>{
        const {name ,value}=event.target ;
        setInput({...input ,[name]:value})
    }

    const setResume=(event)=>{
        const file=event.target.files?.[0];
        if(file){
            setInput({...input,resume:file});
        }
    }


    return (
        <div className='flex justify-center mt-40'>
            <Card className="md:w-1/3 lg:w-2/3 sm:w-1/4">
                <CardHeader>
                    <CardTitle className="text-3xl">Instructor Role At E-learning</CardTitle>
                    <CardDescription className="text-xl">Become an instructor at E-learning Now</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                    {/* htmlFor is if we click on that label the corresponding input will be foccused therfore we have id here in input */}
                                <Label htmlFor="userName" className="ml-2">Name <span className='text-red-700'>*</span></Label>
                                <Input
                                    id="userName"
                                    name="userName"
                                    placeholder="Name"
                                    required="true"
                                    value={user.name}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="education" className="ml-2">Education <span className='text-red-700'>*</span></Label>
                                <Input
                                    id="education"
                                    name="education"
                                    placeholder="Education (College)"
                                    value={input.education}
                                    onChange={(event)=>changeHandler(event)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="experience" className="ml-2">Experience <span className='text-red-700'>*</span></Label>
                                <Input
                                    id="experience"
                                    name="experience"
                                    placeholder="Experience (in years)"
                                    value={input.experience}
                                    onChange={(event)=>changeHandler(event)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="resume" className="ml-2">Resume <span className='text-red-700'>*</span></Label>
                                <Input 
                                id="resume"
                                name="resume"
                                type="file"
                                onChange={(event)=>setResume(event)}>
                                </Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={()=>sendHandler()} disabled={isLoading}>
                        {
                            isLoading && <Loader2   className='animate-spin'/>
                        }
                        Send Request
                        </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Careers