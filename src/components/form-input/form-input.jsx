import "./form-input.scss";
import { Fragment, Component, createRef } from "react";

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldValue: "",
      didBlurOnce: false,
      showErrorMessage: false,
    };

    this.inputField = createRef();
  }

  handleChange = () => {
    const inputField = this.inputField.current;
    const { didBlurOnce } = this.state;

    if (didBlurOnce) {
      if (this.isFieldValid()) {
        this.setState({
          fieldValue: inputField.value,
          showErrorMessage: false,
        });
      } else {
        this.setState({ fieldValue: inputField.value, showErrorMessage: true });
      }
    } else {
      this.setState({ fieldValue: inputField.value });
    }
  };

  handleBlur = () => {
    const { didBlurOnce } = this.state;

    if (!didBlurOnce) {
      if (!this.isFieldValid()) {
        this.setState({ didBlurOnce: true, showErrorMessage: true });
      } else {
        this.setState({ didBlurOnce: true });
      }
    }
  };

  getValue = () => {
    return this.state.fieldValue;
  };

  clearField = () => {
    this.setState({
      fieldValue: "",
      didBlurOnce: false,
      showErrorMessage: false,
    });

    this.inputField.current.value = "";
  };

  isFieldValid = () => {
    const inputField = this.inputField.current;
    let { extraValidityCheck } = this.props;

    if (!extraValidityCheck) {
      extraValidityCheck = () => true;
    }

    return inputField.checkValidity() && extraValidityCheck(inputField);
  };

  render() {
    const { label, id, type, fieldName, required, pattern, errorMessage } =
      this.props;
    const { fieldValue, showErrorMessage } = this.state;

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
          onBlur={this.handleBlur}
          ref={this.inputField}
        />

        <label className='form-input-label' htmlFor={id}>
          {label}
        </label>

        {showErrorMessage ? (
          <p className='error-message'>{errorMessage}</p>
        ) : null}
      </Fragment>
    );
  }
}

export default FormInput;
