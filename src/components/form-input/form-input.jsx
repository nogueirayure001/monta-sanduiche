import "./form-input.scss";
import { Fragment } from "react";

const FormInput = ({ label, id, fieldName, required = false, pattern }) => {
  return (
    <Fragment>
      <input
        className='form-input'
        type='text'
        id={id}
        name={fieldName}
        required={required}
        pattern={pattern ? pattern : null}
      />

      <label className='form-input-label' htmlFor={id}>
        {label}
      </label>
    </Fragment>
  );
};

export default FormInput;
