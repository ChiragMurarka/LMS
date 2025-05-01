
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import path from 'path'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import AddCourse from './pages/admin/course/AddCourse'
import CourseTable from './pages/admin/course/CourseTable'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import { Toaster } from 'sonner'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { GoogleOAuthProvider } from '@react-oauth/google'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element:
          <>
            <HeroSection />
            <Courses />
          </>
      },
      {
        path: "login",
        element: <AuthenticatedUser>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>  {/*google oauth components used in Login.jsx require GoogleOAuthProvider */}
            <Login />
          </GoogleOAuthProvider>
        </AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: <ProtectedRoute><MyLearning /></ProtectedRoute>
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: 'course/search',
        element: <SearchPage />
      },
      {
        path: 'course-details/:courseId',
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
      },
      {
        path: "course-progress/:courseId",
        element:
          <ProtectedRoute>

            <CourseProgress />

          </ProtectedRoute>
      },

      //admin routes 

      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute>,        //admin route will apply to all below components
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",                           //dynamic routing check CoureTable.jsx edit button
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ]
      },
    ]
  }
])
function App() {


  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>

  )
}

export default App
