import React from 'react'
import Card from './Card'
import projectList from '../../utils/project_util'
const ProjectList = () => {


    return (
        <div   className=' pt-28 gap-x-6 rounded-lg flex flex-col  justify-evenly sm:flex-row w-[100%] sm:justify-center items-center h-[80vh]'>
            {Object.entries(projectList).map(el => {
                return <Card key={el[0]} details={el[1]} />
            })}

        </div>
    )
}

export default ProjectList