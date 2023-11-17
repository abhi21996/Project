import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        phone:'',
        gender:''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values, "---->>")
        axios.post('http://localhost:4008/student',values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }   
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2> Add Student </h2>
                <div className='mb-2'>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter Name' className='form-control'
                    onChange={e => setValues({...values,name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' placeholder='Enter Email' className='form-control' 
                    onChange={e => setValues({...values,email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor=''>Phone</label>
                    <input type='number' placeholder='Enter number' className='form-control' 
                    onChange={e => setValues({...values,phone: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor=''>Gender</label>
                    <input type='text' placeholder='Male/Female/Other' className='form-control' 
                    onChange={e => setValues({...values,gender: e.target.value})}/>
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create