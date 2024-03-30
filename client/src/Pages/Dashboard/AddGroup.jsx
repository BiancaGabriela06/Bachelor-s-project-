import React, {useState} from "react"
import axios from 'axios'
import {Grid, Button, TextField, Autocomplete, Chip, Alert} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';

const AddGroup = () => {
    const [success, setSuccess] = useState(0);
    const [groupTitle, setGroupTitle] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    var currentUser = localStorage.getItem("currentUser");
    const [username, setUsername] = useState(currentUser.replace(/^"|"$/g, ''));
    const [message, setMessage] = useState("");

    const attributes = [
        {label: "mountains"},
        {label: "city"},
        {label: "vegan"},
        {label: "sea"},
        {label: "couple"},
        {label: "single"},
        {label: "europe"}
    ]

    const handleDelete = (index) => {
        setSelectedAttributes((prevAttributes) => prevAttributes.filter((_, i) => i !== index));
    };

    const addAttribute = () => {
        if (selectedAttributes.indexOf(groupTitle) === -1 && groupTitle !== "") {
            setSelectedAttributes([...selectedAttributes, groupTitle]);
        }
    };

    const addGroup = () => {
        const values = {
            title: groupTitle,
            description: groupDescription,
            attributes: selectedAttributes,
            admin: username 
        }
        axios.post('http://localhost:3001/dashboard/group', values)
        .then(res => {
            if (res.data.Status === 'Success') {
                setMessage(res.data.Message);
                setSuccess(1);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Title Group"
                    variant="standard"
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Group Description"
                    variant="standard"
                    multiline
                    rows={4}
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    multiple
                    disablePortal
                    id="combo-box-demo"
                    options={attributes.map((option) => option.label)}
                    sx={{ width: 300 }}
                    value={selectedAttributes}
                    onChange={(event, newValue) => {
                        setSelectedAttributes(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Attributes" />
                    )}
                />
                <Button onClick={addAttribute} disabled={!groupTitle.trim()} style={{marginLeft: "10px"}}>Add Attribute</Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={addGroup}>
                    Add Group
                </Button>
            </Grid>
            {success ? (<Grid item xs={12}>
                    <Alert
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="success"
                    >{message}</Alert>
                </Grid>) : (
                <Grid/>
            )}
        </Grid>
        </>
    )
}


export default AddGroup