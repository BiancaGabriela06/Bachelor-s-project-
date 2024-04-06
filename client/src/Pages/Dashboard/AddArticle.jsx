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
    const [files, setFiles] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [groupTitle, setGroupTitle] = useState("");
    const [values, setValues] = useState({
      username: username,
      title: "",
      text: "",
      categories: ""
    })

    const categories = [
      {label: "mountains"},
      {label: "city"},
      {label: "vegan"},
      {label: "sea"},
      {label: "couple"},
      {label: "single"},
      {label: "europe"}
  ]
  const handleDelete = (index) => {
    setSelectedCategories((prevAttributes) => prevAttributes.filter((_, i) => i !== index));
};

    const addCategory = () => {
        if (selectedCategories.indexOf(groupTitle) === -1 && groupTitle !== "") {
            setSelectedCategories([...selectedCategories, groupTitle]);
        }
    };
    const handleImageChange = (event) => {
      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);
      setFiles(event.target.files);
  };

  const submitArticle = () => {
    console.log(files);
    const config = {header : {'Content-Type' : 'multipart/form-data'}}
    axios.post('http://localhost:3001/image/article', files, config)
    .then(res => {
      if (res.data.Status === 'Success') {
          setMessage(res.data.Message);
          }
      })
    .catch(err => console.log(err));
     
    values.categories = selectedCategories;
    axios.post('http://localhost:3001/dashboard/article', values)
    .then(res => {
        if (res.data.Status === 'Success') {
            setMessage(res.data.Message);
            setIdArticle(res.data.Article);
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
          multiple // Allow multiple file selection
          name="uploadedImages"
          onChange={handleImageChange}
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
      <Button onClick={addCategory} disabled={!groupTitle.trim()} style={{marginLeft: "10px"}}>Add Category</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={submitArticle}>
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