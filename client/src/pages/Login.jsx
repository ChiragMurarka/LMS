//1LZ1tSPjljY1nocz
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
//import { c } from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P"

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess  }] = useLoginUserMutation();

  const changeInputHandler = (event, type) => {
    const { name, value } = event.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }
    else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration =async  (type) => {
    const inputData = type === "signup" ? signupInput : loginInput
    const action =type==="signup"?registerUser:loginUser;
    await action(inputData);
  }

const navigate=useNavigate();

useEffect(()=>{
  if(registerIsSuccess && registerData){
    toast.success(registerData.message||"Signup successfully")
  }
  if(registerError){
    toast.error(registerError.data.message||"Signup failed")
  }
  if(loginIsSuccess && loginData){
    toast.success(loginData.message||"Login successfully")
    navigate("/");
  }
  if(loginError){
    toast.error(loginError.data.message||"Login failed")
  }
},[loginIsSuccess,registerIsSuccess,loginError,registerError]) //triggers if any of these changes


  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">LogIn</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create you new account now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(event) => changeInputHandler(event, "signup")}
                  placeholder="eg. Chirag"
                  required="true" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(event) => changeInputHandler(event, "signup")}
                  placeholder="eg. Chirag@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(event) => changeInputHandler(event, "signup")}
                  placeholder="eg. @3#eh$"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate spin"/>Please wait
                    </>
                  ):"Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login into your existing account now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(event) => changeInputHandler(event, "login")}
                  placeholder="eg. Chirag@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Password</Label>
                <Input type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(event) => changeInputHandler(event, "login")}
                  placeholder="eg. @3#eh$"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate spin"/>Please Wait
                    </>
                  ):"Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Login;
