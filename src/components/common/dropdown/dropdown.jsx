import React from 'react';

const Dropdown = ({data, className, onChange,isFormControlled}) => {
  return ( 
    <div
      className={
      className
        ? className + " dropdown-container"
        : "dropdown-container"
    }>
      <label htmlFor={data.name}>{data.label}</label>
      <select className={isFormControlled ? "form-control" : ""} value={data.value} name={data.name} id={data.name} onChange={onChange}>
        <option value="" defaultValue>--</option>
        {data.options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </div> 
  );
}
 
export default Dropdown;