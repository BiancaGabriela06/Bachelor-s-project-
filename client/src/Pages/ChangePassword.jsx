import React, {useState, useEffect} from 'react'
import axios from "axios"
import image from "../assets/images/changepasswordpage.jpg"
import "../Styling/ChangePassword.css"
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const [values, setValues] = useState({
        newpassword: "",
        confirmpassword: ""
    })

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
      
        axios.post('http://localhost:3001/auth/changepassword', values)
          .then(res => {
              if(res.data.Status === 'Success'){
                  navigate("/login");
              }
              else{
                  
                  setError(res.data.Error)
              }
          })
          .catch(err => console.log(err))
    }
     return (
        <div>
			<div class="container bootstrap snippets bootdey">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-md-offset-2">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <h3 class="panel-title">
                                    <span class="glyphicon glyphicon-th"></span>
                                    Change password   
                                </h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 separator social-login-box"> <br/>
                                    <img alt="" class="img-thumbnail" src={image}/>                        
                                    </div>
                                    <div style={{/*margin-top:80px;*/}} class="col-xs-6 col-sm-6 col-md-6 login-box">
                                    <div class="form-group">
                                        {error && error}
                                        <div class="input-group">
                                        <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
                                        <input class="form-control" type="password" placeholder="New Password"
                                        onChange={e => setValues({...values, newpassword: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                        <div class="input-group-addon"><span class="glyphicon glyphicon-log-in"></span></div>
                                        <input class="form-control" type="password" placeholder="Confirm Password"
                                        onChange={e => setValues({...values, confirmpassword: e.target.value})}/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6"></div>
                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                        <button class="btn icon-btn-save btn-success" type="submit"
                                        onClick={handleSubmit}>
                                        <span class="btn-save-label"><i class="glyphicon glyphicon-floppy-disk"></i></span>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default ChangePassword