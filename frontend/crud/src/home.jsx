import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4008/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:4008/delete/'+id)
      .then(res =>{
        //to reload the userinterface
        location.reload();
      })
      .catch(err => console.log(err));
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='bg-white rounded p-3'>
        <h2 style={{textAlign:'center'}}>Student List</h2>
       <div className='d-flex justify-content-end'>
        <Link to="/create" className='btn btn-success'>Create +</Link>
       </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>GENDER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => {
                return <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.gender}</td>
                  <td>
                    <Link to={`read/${item.id}`} className='btn btn-sm btn-info'>Read</Link>
                  <Link to={`/edit/${item.id}`} className='btn btn-sm btn-primary mxx-2'>edit</Link>
                 <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger'>delete</button>
                 </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home