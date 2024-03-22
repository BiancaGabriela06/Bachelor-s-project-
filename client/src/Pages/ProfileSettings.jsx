import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styling/ProfileSettings.css';
import Navbar from '../Components/Navbar';
import {NavLink, useNavigate} from 'react-router-dom'


const ProfileSettings = () => {

  var currentUser = localStorage.getItem("currentUser");
  const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const handleFile = (e) => {setFile(e.target.files[0])}
  var [profileImage, setProfileImage] = useState();
  const [changePassword, setValues] = useState({
    username: username, 
    currentPassword: "",
    newPassword: ""
  })
  
  const [userInfo, setUserInfo] = useState({
      username: username,
      mobileNumber: "",
      emailAddress: "",
      aboutMe: ""
  })


  const submitPassword = (e) => {
    axios.post('http://localhost:3001/users/changePassword', changePassword)
         .then(res => {
          if(res.data.Status === 'Success'){
            setMessage(res.data.Event);
          }
          else if(res.data.Status === 'Error')
               { 
                  setMessage(res.data.Error);
               }
         })
         .catch(err => console.log(err));
  }

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

  const imageHandler = async () => {
    try {
      const formdata = new FormData();
      formdata.append('file', file);

      const response = await axios.post('http://localhost:3001/image/profile', formdata);
      if (response.data.Status === 'Success') {
        const values = {
          user: username,
          filename: response.data.filename
        };

        const userResponse = await axios.post('http://localhost:3001/image/profile/user', values);
        if (userResponse.data.Status === 'Success') {
          const updatedResponse = await axios.post('http://localhost:3001/image/user', { username });
          if (updatedResponse.data.Status === 'Success') {
            setProfileImage(updatedResponse.data.profileimage);
          } else {
            console.log(updatedResponse.err);
          }
        }
      } else {
        console.log(response.data.Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitUserInfoUpdates = (e) => {
    axios.post('http://localhost:3001/users/changeuserinfo', userInfo)
         .then(res => {
          if(res.data.Status === 'Success'){
            setMessage(res.data.Event);
          }
          else if(res.data.Status === 'Error')
               { 
                  setMessage(res.data.Error);
               }
         })
         .catch(err => console.log(err));
  }
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className="panel panel-default">
              <div className="panel-body text-center">
                {profileImage && (
                  <img
                    src={`http://localhost:3001/profileimages/` + profileImage}
                    alt="Profile Image"
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <form onSubmit={imageHandler}>
                  <input
                    type="file"
                    name="profile"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFile}
                  />
                  <button type="submit" className="btn btn-primary">
                    Change Profile Image
                  </button>
                </form>
              </div>
            </div>
          </div>
  
          <div className="col-xs-12 col-sm-8">
            <form className="form-horizontal">
  
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">User info</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Mobile number</label>
                    <div className="col-sm-10">
                      <input type="tel" className="form-control"
                       onChange={e => setUserInfo({...userInfo, mobileNumber: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">E-mail address</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" 
                        onChange={e => setUserInfo({...userInfo, emailAddress: e.target.value})}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">About me</label>
                    <div className="col-sm-10">
                      <textarea rows="3" className="form-control"
                      onChange={e => setUserInfo({...userInfo, aboutMe: e.target.value})}></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button onClick={submitUserInfoUpdates}type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
  
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Security</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Current password</label>
                    <div className="col-sm-10">
                    <input  type="password" placeholder="Enter current password " id="password" name="password"
                       className="form-control"
                       onChange = {e => setValues({...changePassword, currentPassword: e.target.value})}/> 
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">New password</label>
                    <div className="col-sm-10">
                    <input  type="password" placeholder="Enter new password " id="password" name="password"
                       className="form-control"
                       onChange = {e => setValues({...changePassword, newPassword: e.target.value})}/> 
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button onClick = {submitPassword} type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <div className="message">
                       {message && message}
                     </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  };

export default ProfileSettings;
