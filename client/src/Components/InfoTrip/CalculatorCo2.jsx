import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Grid, Button, Dialog, DialogContent, DialogActions,
        DialogTitle, DialogContentText, Autocomplete, TextField, 
       Typography} from "@mui/material"

const Calculator = () => {

    const [open, setOpen] = useState(false);
    const [places, setPlaces] = useState([])
    var [vehicle, setVehicle] = useState("");
    var [value, setValue] = useState([]);
    var [title, setTitle] = useState("");
    var [error, setError] = useState("");

    const [info, setInfo] = useState({
        from: "",
        to: "",
        ways: "",
        people: 1,
        transport_type: ""
    })
    const handleClickOpen = () => { setOpen(true);};
    const handleClose = () => { setOpen(false);};
    
    

     useEffect( () => {

        const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/places/listofcities');
                    if (response.data.Status === 'Success') {
                        setPlaces(response.data.Data);
                    } else {
                        console.log(response.data.err);
                    }
                } catch (error) {
                    console.log(error);
                }

     }
    fetchData();
    }, [])

     const handleCalculate = () => {
       
        setValue("");
        setVehicle("");
        setTitle("");
        setError("");
        axios.post('http://localhost:3001/co2e/calculate', {info})
        .then(response => {
            if(response.data.Status === 'Success'){
                console.log("Trips: " + response.data.Transportation_title)
                setValue(response.data.Co2e);
                setVehicle(response.data.Vehicle_title);
                setTitle(response.data.Title)
            }
            else if(response.data.Status === 'No Found')
            {
                setError(response.data.Message);
                console.log(response.data.err);
            }
        })
                
    }

    return (
        <>
        <Grid container>
        <Button variant="outlined" color="success" onClick={handleClickOpen}>
                 Calculator Co2 emissions
        </Button>
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontSize: '2.5rem', textAlign: 'center' }}>
                   Calculate emissions of Co2 for an unplaned trip.
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{ fontSize: '2rem', textAlign: 'center' }}>
                    Verify emissions of Co2 for more than one transport type
                    and choose the right option for the planet and your comfort.
                </DialogContentText>
                <Grid container>
                    <Grid item padding={3}>
                    <Autocomplete
                        id="standard-search"
                        options={places.map((option) => option.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Where from" 
                                value={info.from} 
                                onChange={(e) => setInfo({ ...info, from: e.target.value })} 
                                required
                            />
                        )}
                        value={info.from}
                        onChange={(event, newValue) => {
                            setInfo({ ...info, from: newValue || '' }); 
                        }}
                    />

                    </Grid>
                    <Grid item padding={3}>
                        <Autocomplete  id="standard-search"  options={places.map((option) => option.name)} sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Where from" required
                        value={info.to}
                        onChange={(e) => setInfo({...info, to: e.target.value})}
                        />}
                        value={info.to}
                        onChange={(e, newValue) => setInfo({...info, to: newValue || ''})}
                        />
                    </Grid>
                    <Grid item padding={3}>
                        <Autocomplete freeSolo id = "free-solo-2-demo" options = {[1, 2]}  
                            renderInput={(params) => < TextField {...params} label="Ways" value = {info.ways} 
                            onChange={(e) => { console.log('Input Value:', e.target.value); setInfo({...info, ways: e.target.value})}
                        }/>
                        } 
                            value = {info.ways} 
                            onChange={(e, newValue) => { console.log('Input Value:', e.target.value); 
                            setInfo({...info, ways: newValue || ''})}}/>
                    </Grid>
                    <Grid item padding={3}>
                        <Autocomplete freeSolo id = "free-solo-2-demo" options = {[1, 2, 3, 4, 5, 6]}  
                            renderInput={(params) => < TextField {...params} label="People" 
                            />} 
                            value = {info.people} onChange={(e, newValue )=> { console.log('Input Value:', e.target.value); 
                            setInfo({...info, people: newValue || ''})}}/>
                    </Grid>
                    <Grid item padding={3}>
                        <Autocomplete freeSolo id = "free-solo-2-demo" options = {["flying", "public-transport", "driving"]}
                            renderInput={(params) => < TextField {...params} label="Transport Type"/>}
                            value = {info.transport_type} onChange={(e, newValue) => {
                                console.log('Input Value:', e.target.value);
                                setInfo({ ...info, transport_type: newValue || '' });
                            }} />

                    </Grid>
                </Grid>  

                </DialogContent>
                {value && vehicle && title && (
                  <Grid container justifyContent="center">
                    <Grid item xs = {10} justifyContent="center">
                        <Typography style={{textAlign: 'center'}} variant = "h3">
                            Your trip emission of Co2 is <span style={{fontWeight: 'bold', color: 'darkgreen'}}>{value && value}</span>
                        </Typography>
                    </Grid> 
                    <Grid item xs = {10} justifyContent="center">
                        <Typography style={{textAlign: 'center'}} variant="h3">
                            Transport Type: <span style={{fontWeight: 'bold', color: 'darkgreen'}}>{vehicle && vehicle}</span>
                        </Typography>
                    </Grid>       
                  </Grid>   
                )}
                {error && (
                    <Grid container justifyContent="center">
                         <Typography style={{textAlign: 'center'}} >
                            <span style={{fontWeight: 'bold', color: 'red'}}>{error}</span>
                        </Typography>
                    </Grid>
                )}
                <DialogActions>
                <Button onClick={handleCalculate}>CALCULATE</Button>
                <Button onClick={handleClose} autoFocus> Done</Button>
                </DialogActions>
          </Dialog>
        </Grid>
        </>
    )
}

export default Calculator;