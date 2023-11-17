import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {

    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4008/read/'+id)
            .then(res => {
                console.log(res)
                setValues({...values, name: res.data[0].name, email:res.data[0].email, phone: res.data[0].phone, gender: res.data[0].gender});
            })
            .catch(err => console.log(err));
    }, []);

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        gender: ''
    })

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put('http://localhost:4008/update/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <h2> Update Student </h2>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type='text' placeholder='Enter Name' className='form-control' value={values.name}
                onChange={e => setValues({...values,name: e.target.value})}/>
            </div>
            <div>
                <label htmlFor=''>Email</label>
                <input type='email' placeholder='Enter Email' className='form-control' value={values.email}
                onChange={e => setValues({...values,email: e.target.value})}/>
            </div>
            <div>
                <label htmlFor=''>Phone</label>
                <input type='number' placeholder='Enter number' className='form-control' value={values.phone} 
                onChange={e => setValues({...values,phone: e.target.value})}/>
            </div>
            <div>
                <label htmlFor=''>Gender</label>
                <input type='text' placeholder='Male/Female/Other' className='form-control' value={values.gender}
                onChange={e => setValues({...values,gender: e.target.value})}/>
            </div>
            <button className='btn btn-success'>Update</button>
        </form>
    </div>
</div>
  )
}

export default Update