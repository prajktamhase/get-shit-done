import React, { useEffect } from 'react';
import Footer from "./../../component/Footer/Footer";
import showToast from 'crunchy-toast';
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
        }
    ]);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(true);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('getShitDone'));
        if (list && list.length > 0) {
            setTaskList(list);
        }
    }, []);

    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('getShitDone', JSON.stringify(tasks));
    };

    const clearInputField = () => {
        setTitle('');
        setDescription('');
        setPriority('');
    }

    const checkrequiredFild=()=>{
        if(!title){
            showToast('Title is required..!', 'alert',5000);
            return false;
        }
        if(!description){
            showToast('Description is required..!', 'alert',5000);
            return false;
        }
        if(!priority){
            showToast('Priority is required..!', 'alert',5000);
            return false;
        }
        return true;

    }

    const addTaskToList = () => {
       if (checkrequiredFild()===false){
        return;
       };
        
        const randomId = Math.floor(Math.random() * 1000);

        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority,
        };

        const newTaskList = [...taskList, obj];

        setTaskList(newTaskList);
        clearInputField()
        saveListToLocalStorage(newTaskList);
        showToast('Task Added successful..!', 'success', 5000);
    };

    const removeTaskFromList = (id) => {
        let index;
        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])
        saveListToLocalStorage(tempArray)
        showToast('Task delete successful..!', 'success', 5000);
    }

    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);
        let currentEditTask;

        taskList.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;
            }
        })
        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);
    }
    const updateTask = () => {
        if (checkrequiredFild()===false){
            return;
           };
        let indexToUpdate;

        taskList.forEach((task, i) => {
            if (task, id === id) {
                indexToUpdate = i;
            }
        })
        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            description: description,
            priority: priority,
        }
        setTaskList([...tempArray])
        setId(0);
        clearInputField();
        setIsEdit(false);
        showToast('Task Updated successful..!', 'warning', 5000);
    }

    return (
        <>
            <div className='container'>
                <h1 className='text'>Get-Shit-Done🎼</h1>

                <div className='flex-container'>
                    <div>
                        <h2 className='center-text'>Show List</h2>
                        <div className='tasks-container'>
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
                                   
                                        <button
                                            type='button'
                                            className='add-button'
                                            onClick={()=>{
                                                isEdit ? updateTask(): addTaskToList()
                                            }}>
                                            { isEdit ?'Update' :'Add'}
                                        </button>
                                        
                                    
                                </div>
                            </form>
                        </div>
                        
                    </div>
                    <Footer/>
                </div>
                
            </div>
            
        </>
    );
};

export default Home;

