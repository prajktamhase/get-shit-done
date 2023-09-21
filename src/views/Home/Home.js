import react from 'react';
import Task from "./../../component/Task/Task";
import './Home.css';

import { useState } from 'react';
const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'submit',
            description: "jhfgdzs",
            priority: 'High',
        },

    ])

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ priority, setPriority ] = useState('');
    const addTaskToList=() => {
        const randomId=Math.floor(Math.random() *1000);

        const obj = {
        id: randomId,
        title: title,
        description: description,
        priority: priority,
    }
        setTaskList([...taskList,obj])
        
        setTitle('');
        setDescription('');
        setPriority('');  
}  

    return (
        <>
            <div className='container'>
                <h1 className='text'>Get-Shit-Done🎼</h1>

                <div className='flex-container'>
                    <div>
                        <h2 className='center-text'>Show List</h2>
                        {
                            taskList.map((taskItem, index) => {
                                const { id, title, description, priority } = taskItem;

                                return (<Task id={id} title={title} description={description} priority={priority} />
                                )

                            })
                        }
                    </div>

                    <div>
                        <h2 className='center-text'> Add List</h2>
                        <div className='add-task-from-container'>
                            <h3>Show Title:{title}</h3>
                            <form>
                                
                                <input type='text' 
                                value={title}
                                 onChange={(e) => {
                                setTitle(e.target.value)
                                console.log(e)
                                }} 
                                placeholder='Enter Title'
                                className='task-container'/>


                                <input type='text' 
                                value={description} 
                                onChange={(e) => {
                                setDescription(e.target.value)
                                console.log(e)
                                }} 
                                placeholder='Enter Description'
                                className='task-container'/>


                                <input type='text' 
                                value={priority} 
                                onChange={(e) => {
                                setPriority(e.target.value)
                                console.log(e)
                                }} 
                                placeholder='Enter Priority'
                                className='task-container'/>
                             
                        <button type='button' className='add-button' onClick={addTaskToList}>Add Task To List</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Home