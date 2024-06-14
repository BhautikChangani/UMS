import React, { useState, useEffect } from 'react';
import { addEmployee } from './service/localstorage';
import { removeEmployee,getListEmployees, getEmployeeById, editEmployee } from './service/localstorage';
import uuid from 'react-uuid';
import { useForm } from './hooks/useForm';

const Form = ({ toggleTab, id = null, fetchData, setEmployees }) => {

    const { inputValues, handleInputChange, resetForm, setForm } = useForm({
        name: '',
        email: '',
        address: '',
        phone: '',
        gender:'',
        city:''
    });

    useEffect(() => {
        if (id) {
            const employee = getEmployeeById(id);
            async function fetchEmployee () {
              const employee1 = (await fetch(`http://localhost:3000/users/${id}`)).json();
              
              console.log(employee1.data)

            }
            setForm(employee);
            fetchEmployee();
  
        }
    }, [id]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(id == null) {
            addEmployee({ id: uuid(), ...inputValues});
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers : {
                "Content-Type" : "application/json",
              },
              body : JSON.stringify(inputValues)
            }).then((res) => {
              console.log(res);
            }).catch(function (err) {
              console.log("Unable to fetch -", err);
            });
        } else {
            editEmployee(id, inputValues);
            resetForm();
            toggleTab();
        }
        fetchData();
        toggleTab();
      };
  return (
    <div className="services__modal active-modal" >
    <div className="container">
    <span className="close" onClick={() => toggleTab()}>
       <box-icon name='window-close'></box-icon>
    </span>
    
    <div>
<h3 className="title">Ragistration</h3>

<div className="form_container">
<form className="corm_content" name='fnm' onSubmit={handleSubmit} autoComplete="off">

<div className="form_div">
  
  <label htmlFor="name" className="form-label">
    Name
  </label>
  <input
    type="text"
    className="form_input"
    onChange={handleInputChange}
    placeholder="Enter Your Name"
    name="name"
    required
    value={inputValues.name}
    id="name"
  />
  
</div>
<div className="form_div form_area">
  <label htmlFor="address" className="form-label">
    Address
  </label>
  <textarea
    name="address"
    id="address"
    required
    value={inputValues.address}
    onChange={handleInputChange}
    placeholder="Enter Your Address"
    className="form_input "
  />
</div>
<div className="form_div">
  <label htmlFor="name" className="form-label">
    Email
  </label>
  <input
    type="email"
    name="email"
    id="email"
    required
    value={inputValues.email}
    onChange={handleInputChange}
    placeholder="EX: abc@gmail.com..."
    className="form_input"
  />
</div>
<div className="form_div">
  <label htmlFor="name" className="form-label">
    Number
  </label>
  <input
    type="number"
    name="phone"
    id="number"
    required
    value={inputValues.phone}
    onChange={handleInputChange}
    placeholder="EX: 123456789"
    className="form_input"
  />
</div>
<div className="form_div form_radio d-flex align-items-center">
  <p>Gender :</p>
  <span className="radio_element d-flex align-items-center">
    <label htmlFor="male" className="main_text">
      Male
    </label>
    <input
      type="radio"
      name="gender"
      values={inputValues.male}
      id="male"
      required
      onChange={handleInputChange}
      value="male"
    />
  </span>
  <span className="radio_element d-flex align-items-center">
    <label htmlFor="male" className="main_text">
      Female
    </label>
    <input
      type="radio"
      name="gender"
      id="female"
      required
      values={inputValues.female}
      onChange={handleInputChange}
      value="female"
    />
  </span>
</div>
<div className="form_div">
  <label htmlFor="city" className="form-label">
    City
  </label>
  <select
    name="city"
    id="city"
    required
    value={inputValues.city}
    onChange={handleInputChange}
    className="form_select"
  >
    <option value=''  disabled selected >
      Select City
    </option>
    <option value="ahmedabad" name="Ahmedabad">
      Ahmedabad
    </option>
    <option value="rajkot">Rajkot</option>
    <option value="jamnagar">Jamnagar</option>
    <option value="surat">Surat</option>
  </select>
</div>
<div className="form_div">
  <div className="form_check">
    <input type="checkbox" id="check" />
    <span className="main_text">
      I agree to the company term and policy.
    </span>
  </div>
</div>

    <div className="btn-group">
  <button type="submit" className="btn">
    SIGN UP
  </button>
  <button type="reset" onClick={() => resetForm()} className="btn">
    RESET
  </button>
  </div>

</form>
</div>
</div>
    </div>
  </div>
  )
}

export default Form
