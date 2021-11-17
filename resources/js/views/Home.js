import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import Pagination from "react-js-pagination";


function Home() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {value, setValue} = useContext(UserContext);
    const [todos, setTodos] = useState([])
    const [upTodo, setUpTodo] = useState('');
    const [editInput, setEditInput] = useState(false);

    const getTodo = async (page = 1) => {
        await axios.post(`/api/tasks?page=${page}`, {user: value.user.id}).then((response) => {
           setTodos(response.data)
            console.log(response.data)
        })
    }

    const addTodo = async (data) => {
       await axios.post('/api/tasks/store', {...data, user: value.user.id}).then((response) => {
            setTodos(response.data)
           reset()
        })
        getTodo();
    }

    const updateTodo = async (id) => {
        console.log(upTodo)
        console.log(id)

        axios.post('/api/tasks/update', {todo: upTodo, id: id}).then(() => {
            setEditInput(false)
            getTodo();
        })

    }

    const searchTodo = (word) => {

        if(word === ''){
            getTodo();
        }

        let newTodo = todos.data.filter((item) => {
           return !item.todo.search(word);
        })

        setTodos({'data': newTodo});
    }

    const deleteTodo = async (id) => {
        await axios.get('/api/tasks/delete/' + id).then((response) => {
            getTodo();
        })
    }

    const auth = () => {
        setValue(null);
        localStorage.setItem('user', null)
    }

    useEffect(() => {
        getTodo();
    }, [])

    return (
        <div className="home">
            <h1 className="heading mb-5">To-do App with Laravel + React JS</h1>

            <input type="text" className="form-control w-100 mb-2" onChange={(e) => searchTodo(e.target.value)} placeholder="Search"/>

            <div className="todoListContainer">
                    <form onSubmit={handleSubmit(addTodo)}>
                        <input type="text" {...register('todo')} id="newTodo" placeholder="add todo" />
                        <button type="submit" id="addTodo" ><i className="fa fa-plus" /></button>
                    </form>
                    <ul id="todoList">
                        {todos.data &&
                            todos?.data.map((todo) => {
                                return(
                                    <li key={todo.id} id="li listItemID">
                                        {editInput === false &&
                                        <p className="todotext">{todo.todo}</p>
                                        }
                                        <button data-id="li listItemID" className="removeTodo" onClick={() => deleteTodo(todo.id)}>
                                            <i className="fa fa-minus" />
                                        </button>
                                        {editInput &&
                                            <>
                                                <input type="text" id={todo.id} defaultValue={todo.todo} onChange={(e) => setUpTodo(e.target.value)} />
                                                <button data-id="li listItemID" className="doneTodo" onClick={() => updateTodo(todo.id)}>
                                                    <i className="fa fa-check" />
                                                </button>
                                            </>
                                        }
                                        {editInput === false &&
                                            <button data-id="li listItemID" onClick={() => setEditInput(true)} id={todo.id}>
                                                <i className="fa fa-pencil" />
                                            </button>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
            </div>

            <Pagination
                activePage={todos?.current_page ? todos?.current_page : 0}
                itemsCountPerPage={todos?.per_page ? todos?.per_page : 0 }
                totalItemsCount={todos?.total ? todos?.total : 0}
                onChange={(page) => getTodo(page)}
                pageRangeDisplayed={8}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First Page"
                lastPageText="Last Lage"
            />

            <button className="btn btn-danger mt-5" onClick={() => auth()}>Çıkış Yap</button>

        </div>
    );
}

export default Home;


