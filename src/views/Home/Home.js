import React, { useEffect } from 'react';
import Task from './../../component/Task/Task';
import './Home.css';

import { useState } from 'react';

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'submit',
            description: "Assignment jaldi submit karo",
            priority: 'High',
        },
    ]);
    const [id,setId]=useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit,setIsEdit]=useState(true);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('getShitDone'));
        if (list && list.length>0) {
            setTaskList(list);
        }
    }, []);

    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('getShitDone', JSON.stringify(tasks));
    };

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000);

        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority,
        };

        const newTaskList = [...taskList, obj];

        setTaskList(newTaskList);

        setTitle('');
        setDescription('');
        setPriority('');

        saveListToLocalStorage(newTaskList);
    };

    const removeTaskFromList = (id) => {
        let index;
        taskList.forEach((task,i)=>{
            if(task.id===id){
            index=i
           }
        })

    const tempArray=taskList;
    tempArray.splice(index,1);

    setTaskList([...tempArray])
    saveListToLocalStorage(tempArray)
    }
    const setTaskEditable=(id)=> {
     setIsEdit(true);
     setId(id);
     let currentEditTask;

     taskList.forEach((task) => {
        if(task.id===id){
            currentEditTask=task; 
        }
     })
     console.log(currentEditTask)
    
    }

    return (
        <>
            <div className='container'>
                <h1 className='text'>Get-Shit-Done🎼</h1>

                <div className='flex-container'>
                    <div>
                        <h2 className='center-text'>Show List</h2>
                        {taskList?.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return (
                                <Task
                                    id={id}
                                    title={title}
                                    description={description}
                                    priority={priority}
                                    key={index}
                                    removeTaskFromList={removeTaskFromList}
                                    setTaskEditable={setTaskEditable}
                                />
                            );
                        })}
                    </div>

                    <div>
                        <h2 className='center-text'> 
                        {isEdit ? `Update Task ${id}` : 'Add Task'}
                        </h2>
                        <div className='add-task-from-container'>
                            <h3>Show Title: {title}</h3>
                            <form>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                    placeholder='Enter Title'
                                    className='task-container'
                                />

                                <input
                                    type='text'
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    placeholder='Enter Description'
                                    className='task-container'
                                />

                                <input
                                    type='text'
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value);
                                    }}
                                    placeholder='Enter Priority'
                                    className='task-container'
                                />
                                <div className='btn-container'>
                                    {isEdit ?
                                     <button
                                     type='button'
                                     className='add-button'
                                     onClick={addTaskToList}
                                 >
                                     Update
                                 </button>
                                 :
                                 <button
                                 type='button'
                                 className='add-button'
                                 onClick={addTaskToList}
                             >
                                 Add 
                             </button>
                                 }
                                 </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
