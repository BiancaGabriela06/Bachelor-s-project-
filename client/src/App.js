import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import ForgotPassword from "./Pages/ForgotPassword"
import ProfileSettings from './Pages/ProfileSettings';
import AboutProfile from "./Components/UserProfile/AboutProfile"
import Gallery from "./Pages/Gallery"
import Forum from "./Pages/Forum"
import EmailVerification from "./Pages/EmailVerification"
import ChangePassword from './Pages/ChangePassword';
import Trip from "./Pages/Trip";
import Map from "./Components/Map";
import Footer from './Components/Footer';
import AddTravelIntinerary from './Components/AddTravelIntinerary'
import TripPlanner from './Components/TripPlanner';
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Explore from "./Pages/Explore"
import GalleryProfile from './Components/GalleryProfile';
import HomeDashboard from "./Pages/Dashboard/HomeDashboard";
import UserPage from "./Pages/UserPage"
import { ItineraryProvider } from "./Components/Itinerary/ItineraryContext";

function App() {
  
  return (
    <>
    <div className="vh-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profilesettings" element={<ProfileSettings />} />
        <Route path="/profile/timeline" element = {<Profile />} />
        <Route path="/profile/about" element ={<AboutProfile />}/>
        <Route path="/profile/gallery" element ={< Gallery/>} />
        <Route path="/forum" element = {<Forum />} />
        <Route path="/verify-mail" element = {<EmailVerification/>} />
        <Route path="/changepassword" element = {<ChangePassword/> } />
        <Route path="/trip" element = {<Trip/>} />
        <Route path="/map" element = {<Map/>} />
        <Route path="/footer" element = {<Footer/>} />
        <Route path="/addtravelintinerary" element={<AddTravelIntinerary/>}/>
        <Route path="/tripplanner" element={<TripPlanner/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/gallery" element={<GalleryProfile/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/dashboard" element={<HomeDashboard/>}/>
        <Route path="/users/:username" element={<UserPage/>}/>
      </Routes>
    </div>
    </>
  );
  
}

export default App;
