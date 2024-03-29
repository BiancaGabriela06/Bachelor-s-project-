import React, {useState} from "react"
import {Grid, Button, TextField, Autocomplete, Chip, Alert} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';

const AddGroup = () => {
    const [choices, setChoices] = useState([])
    const [option, setOption] = useState([])
    const [success, setSuccess] = useState(1);

    const atributes = [
        {label: "mountains"},
        {label: "city"},
        {label: "vegan"},
        {label: "sea"},
        {label: "couple"},
        {label: "single"},
        {label: "europe"}
    ]

    const handleDelete = () => {

    }

    const addAtribute = () => {
        setChoices([...choices, option])
    }
    
    const addGroup = () => {

    }

    return (
        <>
        <Grid container>
            <TextField id="standard-basic" label="Title Group" variant="standard" />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={atributes}
                sx={{ width: 300 }}
                renderInput={(params) => 
                <TextField {...params} label="Atributes" value="Select atributes" onChange={(e) => setOption(e.target.value)}/>}
                value="Select atributes" onChange={(e) => setOption(e.target.value)}
                />
            <Button onClick={addAtribute}>Add</Button>
            {
                choices.map((choice, index) => (
                    <Chip label={choice} onDelete={handleDelete} />
                ))
            }

            <Grid item xs = {12}>
                <Button onClick={addGroup}>Add Group</Button>
            </Grid>
            {
                success && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                      Group added successfuly
                    </Alert>
                )
            }
        </Grid>
        </>
    )
}


export default AddGroup