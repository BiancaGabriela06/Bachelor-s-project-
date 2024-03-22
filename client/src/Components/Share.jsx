import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../Styling/Share.css"
import { useNavigate } from 'react-router-dom'

const Share = () => {
    
    const navigate = useNavigate();
    const [post, setPost] = useState({
        username: "",
        filename: "",
        description: "",
        location: ""
    });

    const [file, setFile] = useState("");


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

      const fileHandler = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      
        const formdata = new FormData();
        formdata.append('file', selectedFile);
      
        try {
          const response = await axios.post('http://localhost:3001/image/post', formdata);
      
          if (response.data.Status === 'Success') {
            post.filename = response.data.filename;
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
      

    const sharePost = () => {
           post.username = username;
           console.log(post);

           axios.post('http://localhost:3001/share/post', post)
           .then(res => {
                 if(res.data.Status === 'Success') {
                      post.filename =""
                      setFile("")
                      navigate("/profile")
                 }
                 else{
                    console.log(res.data.Error)
                 }
           })
           .catch(err => console.log(err))

    }
    
    return (
        <div className="share">
          <div className="container">
            <div className="top">
              <div className="left">
                <img src={`http://localhost:3001/profileimages/` + profileImage} alt="" />
                <input
                  type="text"
                  placeholder={`What's on your mind, ${username}?`}
                  onChange={e => setPost({...post, description: e.target.value})}
                />
              </div>
              <div className="right">
                {file && (
                  <img className="file" alt="" src={`http://localhost:3001/postimages/` + post.filename} />
                )}
              </div>
            </div>
            <hr />
            <div className="bottom">
              <div className="left">
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={fileHandler}
                />
                <label htmlFor="file">
                  <div className="item">
                  <i class="fa fa-picture-o" aria-hidden="true"></i>
                    <span>Add Image</span>
                  </div>
                </label>
                <div className="item">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <span>Add Place</span>
                </div>
              </div>
              <div className="left">
                <button onClick={sharePost}>Share</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Share;