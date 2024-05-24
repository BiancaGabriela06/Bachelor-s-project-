import React, {useState} from "react"
import axios from 'axios'
import {Grid, TextField, Button, Alert, Autocomplete} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';

const AddArticle = () => {

    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [idArticle, setIdArticle] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [groupTitle, setGroupTitle] = useState("");
    const [values, setValues] = useState({
      username: username,
      title: "",
      text: "",
      categories: "",
      files: ""
    })

    const categories = [
      {label: "mountains"},
      {label: "city"},
      {label: "vegan"},
      {label: "sea"},
      {label: "couple"},
      {label: "single"},
      {label: "europe"},
      {label: "accomodation"}
  ]

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
};

  const handleDelete = (index) => {
    setSelectedCategories((prevAttributes) => prevAttributes.filter((_, i) => i !== index));
};

    const addCategory = () => {
        if (selectedCategories.indexOf(groupTitle) === -1 && groupTitle !== "") {
            setSelectedCategories([...selectedCategories, groupTitle]);
        }
    };
   

  const submitArticle = (e) => {
    e.preventDefault();  
    values.categories = selectedCategories;
    axios.post('http://localhost:3001/dashboard/article', values)
    .then(res => {
        if (res.data.Status === 'Success') {
            setMessage(res.data.Message);
            setIdArticle(res.data.Article);
            const formData = new FormData();
            for (let file of selectedFiles) {
                formData.append('photos', file);
            }
        
            formData.append('articleId', res.data.Article);
            console.log(formData);
            const config = {header : {'Content-Type' : 'multipart/form-data'}}
            axios.post('http://localhost:3001/image/article', formData, config)
            .then(res => {
              if (res.data.Status === 'Success') {
                
                  }
              })
            .catch(err => console.log(err));
                }
    })
    .catch(err => console.log(err));

    
};

    return (
        <>

<Grid container spacing={3} alignItems="center" justify="center">
  <Grid item xs={12}>
    <TextField fullWidth id="standard-basic" label="Title" variant="outlined" onChange={e => { 
                        setValues({...values, title: e.target.value});
                      }}/>
  </Grid>
  <Grid item xs={12}>
    <TextField
      id="outlined-multiline-static"
      label="Write your article here"
      multiline
      rows={10}
      fullWidth
      variant="outlined"
      onChange={e => { 
        setValues({...values, text: e.target.value})}}
    />
  </Grid>
  <Grid item xs={12}>
        <input
          type="file"
          accept="image/*"
          multiple 
          name="uploadedImages"
          onChange={handleFileChange}
        />
        {images.length > 0 && (
          <div>
            <p>Selected Images:</p>
            <Grid container spacing={1}>
              {images.map((image, index) => (
                <Grid item key={index}>
                  <img src={`http://localhost:3001/articleimages/` + image} alt={image.name} width={100} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Grid>
      <Grid item xs = {12}>
           <Autocomplete
                    multiple
                    disablePortal
                    id="combo-box-demo"
                    options={categories.map((option) => option.label)}
                    sx={{ width: 300 }}
                    value={selectedCategories}
                    onChange={(event, newValue) => {
                        setSelectedCategories(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Categories" />
                    )}
                />
      </Grid>
      <Grid item>
        <Button variant="contained" color="success" onClick={submitArticle}>
          Post Article
        </Button>
      </Grid>
      {message && (
        <Grid item xs={12}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {message}
          </Alert>
        </Grid>
      )}
</Grid>

        </>
    )
}

export default AddArticle;