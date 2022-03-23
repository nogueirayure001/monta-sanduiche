import "./form-input.scss";
import { Fragment, Component, createRef } from "react";

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldValue: "",
    };
  }

  handleChange = (e) => {
    this.setState({ fieldValue: e.target.value });
  };

  getValue = () => {
    return this.state.fieldValue;
  };

  render() {
    const { label, id, type, fieldName, required, pattern } = this.props;
    const { fieldValue } = this.state;

    return (
      <Fragment>
        <input
          className={`form-input ${fieldValue ? "filled" : ""}`}
          type={type}
          id={id}
          name={fieldName}
          required={required}
          pattern={pattern ? pattern : null}
          onChange={this.handleChange}
        />

        <label className='form-input-label' htmlFor={id}>
          {label}
        </label>
      </Fragment>
    );
  }
}

export default FormInput;
