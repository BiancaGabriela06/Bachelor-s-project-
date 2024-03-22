import react, {useEffect, useState} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {Typography, Grid} from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

 

const CalculatorCo2E = () => {

    const [places, setPlaces] = useState([])
    const [vehicle, setVehicle] = useState("");
    const [value, setValue] = useState([]);
    const [title, setTitle] = useState("")

    const [info, setInfo] = useState({
        from: "",
        to: "",
        ways: "",
        people: "",
        transport_type: ""
    })

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

    const handleCalculate = (e) => {
       
        e.preventDefault();

        axios.post('http://localhost:3001/co2e/calculate', {info})
        .then(response => {
            if(response.data.Status === 'Success'){
                console.log("Trips: " + response.data.Transportation_title)
                setValue(response.data.Co2e);
                setVehicle(response.data.Vehicle_title);
                setTitle(response.data.Title)
            }
            else
            {
                console.log(response.data.err);
            }
        })
                
    }

    return (
        <>
    
    <Grid container padding={5} backgroundColor = "#ECF8FA" justifyContent="center">
                <Grid item>
                    <p>Calculate emissions of Co2 for an unplaned trip. </p>
                    <p>Verify emissions of Co2 for more than one transport type</p>
                    <p>and choose the right option for the planet and your comfort.</p>
                </Grid>
                <Grid item xs={5} justifyContent="right">
                    <Stack  spacing={2} sx={{ width: 200 }}>
                    <Autocomplete id="free-solo-demo"
                        freeSolo options={places.map((option) => option.name)}
                        getOptionLabel={(option) => (typeof option === 'string' ? option : '')}
                        renderInput={(params) => < TextField {...params} label="From"
                        />}
                        value = {info.from} 
                        onChange={(e) => { console.log('Input Value:', e.target.value); setInfo({...info, from: e.target.value})}} />

                    <Autocomplete freeSolo id="free-solo-2-demo"
                        disableClearable options={places.map((option) => option.name)}
                        getOptionLabel={(option) => (typeof option === 'string' ? option : '')}
                        renderInput={(params) => ( <TextField {...params} label="To" InputProps={{ ...params.InputProps,  type: 'search', }} 
                        />)}
                        value = {info.to} 
                        onChange={(e) => { console.log('Input Value:', e.target.value);setInfo({...info, to: e.target.value})}}/>

                    <Autocomplete freeSolo id = "free-solo-2-demo" options = {[1, 2]}  
                        renderInput={(params) => < TextField {...params} label="Ways" 
                        />} 
                        value = {info.ways} onChange={(e) => { console.log('Input Value:', e.target.value); setInfo({...info, ways: e.target.value})}}/>

                    <Autocomplete freeSolo id = "free-solo-2-demo" options = {[1, 2, 3, 4, 5, 6]}  
                        
                        renderInput={(params) => < TextField {...params} label="People" 
                        />} 
                        value = {info.people} onChange={(e )=> { console.log('Input Value:', e.target.value); setInfo({...info, people: e.target.value})}}/>

                    <Autocomplete freeSolo id = "free-solo-2-demo" options = {["flying", "public-transport", "driving"]}  
                        getOptionLabel={(option) => (typeof option === 'string' ? option : '')}
                        renderInput={(params) => < TextField {...params} label="Transport Type" />}
                        value = {info.transport_type} onChange={(e) => {
                            console.log('Input Value:', e.target.value);
                            setInfo({ ...info, transport_type: e.target.value });
                        }} />

                    <Button onClick = {handleCalculate}color="secondary">Calculate Co2</Button>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack spacing={2} sx={{width: 300}}>
                        <Item>Your trip emission of Co2 is: <p class="text-danger">{value && value}</p></Item> 
                        <Item>Vehicle type:<p class="text-danger">{vehicle && vehicle}</p> </Item>
                    </Stack>
                </Grid>
        </Grid>
    </>
    )
}

export default CalculatorCo2E