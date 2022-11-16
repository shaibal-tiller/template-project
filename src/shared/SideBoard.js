import React from 'react'
import { useState, } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SelectDrop from './SelectDrop';


const SideBoard = ({ project_name }) => {



    return (

        <div className=' h-full  side-content card-container w-[100%] '>

            <div className='text-xl font-semibold tracking-tight '
                style={{ padding: '10px', textAlign: 'center' }}>
                <h2>{'ToolBar'.toUpperCase()}</h2>
                <br />
                <hr />
            </div>
            <div className='board-content flex flex-col items-start ml-4'>


                <SelectDrop  name={"location"} label="Select Location" element={[1, 2]} />

                <h2 className='ml-4 text-xl font-semibold'>Omuk</h2>
                <p className='mx-4 text-sm text-justify'>badabudbab duaduab duab ud audu abduabudbaud
                    auduaa abduad ada
                    audu abduab udbauda da</p>
                <p className='mx-4 text-sm text-justify'>badabudbab duaduab duab ud audu abduabudbaud
                    auduaa abduad ada
                    audu abduab udbauda da</p>
                <p className='mx-4 text-sm text-justify'>badabudbab duaduab duab ud audu abduabudbaud
                    auduaa abduad ada
                    audu abduab udbauda da</p>
                <p className='mx-4 text-sm text-justify'>badabudbab duaduab duab ud audu abduabudbaud
                    auduaa abduad ada
                    audu abduab udbauda da</p>

            </div>
        </div>


    )
}

export default SideBoard