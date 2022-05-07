import {Fragment} from 'react';

const Select = ({id, label, options , loading, selectedValue, handleOnSelect}: {
  id: string,
  label: string,
  options: Array<string>,
  loading: boolean,
  selectedValue: string,
  handleOnSelect: any
}) => {
  return (
    <Fragment>
      <label htmlFor={id} className="form-label">{label}</label>
      <select disabled={loading} id={id} className="form-select" value={selectedValue} onChange={handleOnSelect} >
        <option value=''>Please select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Fragment>
  )
}

export default Select