import React from 'react';

const Dropdown = ({data, className, onChange}) => {
  return ( 
    <div
      className={
      className
        ? className + " dropdown-container"
        : "dropdown-container"
    }>
      <label htmlFor={data.name}>{data.label} :</label>
      <select name={data.name} value={data.value} id={data.name} onChange={(e) => onChange(e.currentTarget.value)}>
        <option value="" defaultValue>--</option>
        {data.options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </div> 
  );
}
 
export default Dropdown;