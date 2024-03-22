import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar'
import "../Styling/Profile.css"
import GalleryProfile from '../Components/GalleryProfile';

const Gallery = () => {

  const navigate = useNavigate();

  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));

  var [profileImage, setProfileImage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/image/user', { username });
        if (response.data.Status === 'Success') {
          setProfileImage(response.data.profileimage);
        } else {
          console.log(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const settingsButton = (e) => {
    navigate("/profilesettings");
  }
  
  return (
		<div>
      <Navbar />
			<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="container bootdey">
        <div class="content-page">
            <div class="profile-banner" style={{/*background:url(https://bootdey.com/img/Content/bg1.jpg);*/}}>
            <div class="col-sm-3 avatar-container">
              { profileImage && ( <img src={`http://localhost:3001/profileimages/` + profileImage} class="img-circle profile-avatar" alt="User avatar"/> )}
            </div>
            <div class="col-sm-12 profile-actions text-right">
              <button onClick= {settingsButton} type="button" class="btn btn-primary btn-sm"><i class=""></i>Settings</button>
            </div>
          </div>
            <div class="content">

            <div class="row">
              <div class="col-sm-3">
                
                <div class="text-center user-profile-2" style={{/*margin-top:120px*/}}>
                  <ul class="list-group">
                              <li class="list-group-item">
                      <h4><b>{username}</b></h4>
                        
                    </li>
                  </ul>
                </div>
                
              </div>
              
              <div class="col-sm-9">
                <div class="widget widget-tabbed">
                  
                  <ul class="nav nav-tabs nav-justified">
                    <li><NavLink to ="/profile/timeline" data-toggle="tab" class="fa fa-pencil"> Timeline</NavLink></li>
                    <li><NavLink to ="/profile/about" data-toggle="tab" className="fa fa-user"> About</NavLink></li>
                    <li><NavLink to ="/profile/gallery" data-toggle="tab" className="fa fa-laptop"> Gallery</NavLink></li>
                  </ul>
                  

                  
                  <div class="tab-content">
                    <GalleryProfile/>
                  </div>
                </div>
              </div>
            </div>
          </div>	
        </div>
        </div>
		</div>
	);
};

export default Gallery;
