import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"
import { Box } from '@mui/material';
import { useContext } from 'react';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { GetContext } from '../components/App/Context';

const SelectDrop = ({ element = [], name, label, multiple = false, disabled = false, selected }) => {

    const myContext = GetContext()
    const [value, setValue] = useState(element[0])
    useEffect(()=>{
        myContext.setSbData({...myContext.sbData,[name]:value})
    },[])
    const handleChange = (event) => {

        event.preventDefault()
        if (multiple) {
            const {
                target: { value },
            } = event;
            const tempValues = typeof value === 'string' ? value.split(',') : value;


        }
        else {
            setValue(event.target.value)
            myContext.setSbData({ ...myContext.sbData, [name]: event.target.value })
        }

    }

    return (<div className=' flex flex-col '>
        <Box

            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl size='small' sx={{ minWidth: '100px' }}>
                <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
                <Select
                    disabled={selected && disabled}
                    multiple={multiple}
                    sx={{ "&:hover": { bgcolor: 'transparent' } }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    value={disabled ? selected : value ? value : ""}
                    label={label}
                    onChange={handleChange}
                    
                >

                    {element.length > 0 ? element.map((el, index) => {

                        if (!multiple) {
                            
                            return (<MenuItem key={index}  value={el}>{el}</MenuItem>)
                        }
                        else {
                            return (<MenuItem key={index} value={el}>
                                <Checkbox />
                                <ListItemText primary={el} />

                            </MenuItem>)
                        }
                    }) : (<MenuItem value={""}>{""}</MenuItem>)}


                </Select>
            </FormControl>
        </Box>

    </div>)
}

export default SelectDrop