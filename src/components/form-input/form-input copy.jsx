import "./form-input.scss";
import { Fragment, Component } from "react";

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldValue: "",
      didBlurOnce: false,
      isValueWrong: true,
    };
  }

  handleChange = (e) => {
    const inputField = e.target;
    const { didBlurOnce } = this.state;
    let { extraValidityCheck } = this.props;

    if (!extraValidityCheck) {
      extraValidityCheck = () => true;
    }

    if (didBlurOnce) {
      if (inputField.checkValidity() && extraValidityCheck(e)) {
        this.setState({
          fieldValue: inputField.value,
          isValueWrong: false,
        });
      } else {
        this.setState({ fieldValue: inputField.value, isValueWrong: true });
      }
    } else {
      if (inputField.checkValidity() && extraValidityCheck(e)) {
        this.setState({
          fieldValue: inputField.value,
          isValueWrong: false,
        });
      } else {
        this.setState({ fieldValue: inputField.value, isValueWrong: true });
      }
    }
  };

  handleBlur = (e) => {
    const inputField = e.target;
    const { didBlurOnce } = this.state;
    let { extraValidityCheck } = this.props;

    if (!extraValidityCheck) {
      extraValidityCheck = () => true;
    }

    if (!didBlurOnce) {
      if (!inputField.checkValidity() || !extraValidityCheck(e)) {
        this.setState({ didBlurOnce: true });
      } else {
        this.setState({ didBlurOnce: true, isValueWrong: false });
      }
    }
  };

  getValue = () => {
    return this.state.fieldValue;
  };

  isFieldValid = (e) => {
    const inputField = e.target;
    let { extraValidityCheck } = this.props;

    if (!extraValidityCheck) {
      extraValidityCheck = () => true;
    }

    return inputField.checkValidity() && extraValidityCheck(e);
  };

  render() {
    const { label, id, type, fieldName, required, pattern, errorMessage } =
      this.props;
    const { fieldValue, isValueWrong, didBlurOnce } = this.state;

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
        />

        <label className='form-input-label' htmlFor={id}>
          {label}
        </label>

        {didBlurOnce && isValueWrong ? (
          <p className='error-message'>{errorMessage}</p>
        ) : null}
      </Fragment>
    );
  }
}

export default FormInput;
