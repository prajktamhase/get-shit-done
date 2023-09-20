import react from 'react';
import Task from "./../../component/Task/Task";
import './Home.css';
import { useState } from 'react';
const Home = () => {
    const [taskList,setTaskList]=useState([
    {
    id:1,
    title:'submit',
    description:"jhfgdzs",
    priority:'High',
    },

    {
        id:1,
        title:'submit',
        description:"jhfgdzs",
        priority:'High',
        },

        {
            id:1,
            title:'submit',
            description:"jhfgdzs",
            priority:'High',
            }

    ])
    return (
        <>
            <div className='container'>
                <h1 className='text'>Get-Shit-Done🎼</h1>

                <div className='flex-container'>
                    <div>
                        <h2 className='center-text'>Show List</h2>
                        {
                            taskList.map((taskItem,index) =>{
                               const {id,title,description,priority}=taskItem ;

                                return(<Task id={id} title={title} description={description} priority={priority}/>
                                )

                            })
                        }
                    </div>

                    <div>
                        <h2 className='center-text'> Add List</h2>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home