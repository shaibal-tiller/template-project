import React, { useEffect } from 'react'
import { useState, } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SelectDrop from './SelectDrop';
import { GetContext } from '../components/App/Context';



const SideBoard = ({ pDetails }) => {
    const myContext = GetContext()
    useEffect(() => {
        if (myContext.sbData) {
            /*  
             ######### HANDLE CHANGES AFTER LOCAION CHANGE HERE #########
             */


            // console.log(myContext.sbData.location);
        }
    }, [myContext.sbData])
    const getSection = (title, description) => {
        return (
            <div>
                <br />
                <h2 className='ml-4 text-xl font-semibold'>{title}</h2>
                <p className='mx-4 text-sm text-justify'>{description}</p>

            </div>
        )
    }
    return (
        <div className=' h-full  side-content card-container w-[100%] '>

            <div className='text-xl font-semibold tracking-tight '
                style={{ padding: '10px', textAlign: 'center' }}>
                <h2>{'ToolBar'.toUpperCase()}</h2>
                <br />
                <hr />
            </div>
            <div className='board-content flex flex-col items-start ml-4'>


                <SelectDrop name={"location"} label="Select Location" element={pDetails.location} />

                {getSection("Project Description", pDetails.description)}

                {getSection("Funded By", pDetails.fund)}

            </div>
        </div>


    )
}

export default SideBoard