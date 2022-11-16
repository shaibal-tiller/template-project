import React from 'react'
import Card from './Card'
import projectList from '../../utils/project_util'
const ProjectList = () => {


    return (
        <div   className='gap-x-6 rounded-lg flex flex-col  justify-evenly sm:flex-row w-[100%] sm:justify-center items-center h-[80vh]'>
            {projectList.map(el => {
                return <Card key={el.id} details={el} />
            })}

        </div>
    )
}

export default ProjectList