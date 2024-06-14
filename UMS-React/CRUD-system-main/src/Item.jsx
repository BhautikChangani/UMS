import { toggleChange } from './hooks/useForm';
import { useForm } from './hooks/useForm';
import Form from './Form';
import { useState } from 'react';
import Modal from './Modal';


const Item = ({row, columns, setEmployees, fetchData}) => {

    const { toggleTab, toggle } = toggleChange();
    const { id, name, email, address, phone, gender, city } = row;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalStateHandler = () => {
      setIsModalOpen(!isModalOpen);
    }

  return (
    
        <tr key={row.id} employee={row}>
                {columns.map((column) => {
                  if (column.format) {
                    return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                  }
                  if(column.accessor== 'action'){
                    return <td>
                        <span><box-icon type='solid' className='act' name='edit' onClick={() => toggleTab()}></box-icon></span>
                    <span><box-icon type='solid' className='act' name='message-square-x' onClick={() => modalStateHandler()}></box-icon></span>
                    </td>
                  }else{
                  return <td key={column.accessor}>{row[column.accessor]}</td>
                  }
                })}
                { toggle && <Form toggleTab={toggleTab} id={row.id} fetchData={fetchData} setEmployees={setEmployees}/>}
                { isModalOpen &&  <Modal modalStateHandler={modalStateHandler} fetchData={fetchData} id={id} setEmployees={setEmployees} name={name} />}

            
              </tr>
              
  )
}

export default Item
