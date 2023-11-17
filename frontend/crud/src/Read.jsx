import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Read() {
//we are using useparams to get the id 
    const {id} = useParams();
    const [student, setStudent] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4008/read/'+id)
            .then(res => {
                console.log(res)
                setStudent(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);
    
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='bg-white rounded p-3'>
            <div className='p-2'>
                <h2 style={{textAlign:"center"}}>Student Detail</h2>
                <hr />
                <h2>Id: {student.id}</h2>
                <h2>Name: {student.name}</h2>
                <h2>Email: {student.email}</h2>
                <h2>Phone: {student.phone}</h2>
                <h2>Gender: {student.gender}</h2>
            </div>
            <hr />
            <Link to="/" className='btn btn-primary me-2'>Back</Link>
            <Link to={`/edit/${student.id}`} className='btn btn-info'>Edit</Link>
        </div>
    </div>
  )
}

export default Read