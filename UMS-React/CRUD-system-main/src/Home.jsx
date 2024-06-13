import './style.css';
import { useState, useEffect } from 'react';
import 'boxicons';
import './Home.css';
import { toggleChange } from './hooks/useForm';
import { Table } from './Table';
import { getListEmployees } from './service/localstorage';
import Form from './Form';



export default function Home() {

  const { toggleTab, toggle } = toggleChange();

  const columns = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'address', label: 'Address' },
    { accessor: 'email' , label: 'Email'},
    { accessor: 'phone' , label: 'Phone'},
    { accessor: 'gender' , label: 'Gender'},
    { accessor: 'city' , label: 'City'},
    { accessor: 'action' , label: 'Action'},
  ]

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(getListEmployees());
}, []);
console.log(toggle);

  return (
    <div className="App">
      <span className='add-usr'><box-icon type='solid'size='lg' color="blue" name='user-plus' onClick={() => toggleTab()}></box-icon></span>
      {toggle && <Form toggleTab={toggleTab} setEmployees={setEmployees} />}
      <Table  rows={employees} setEmployees={setEmployees}  columns={columns} />
    
    </div>
  )
}
