import "./form-input.scss";
import { Fragment, Component } from "react";

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldValue: "",
      didBlurOnce: false,
      showErrorMessage: false,
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
          showErrorMessage: false,
        });
      } else {
        this.setState({ fieldValue: inputField.value, showErrorMessage: true });
      }
    } else {
      this.setState({ fieldValue: inputField.value });
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
        this.setState({ didBlurOnce: true, showErrorMessage: true });
      } else {
        this.setState({ didBlurOnce: true });
      }
    }
  };

  getValue = () => {
    return this.state.fieldValue;
  };

  render() {
    const { label, id, type, fieldName, required, pattern, errorMessage } =
      this.props;
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
          onBlur={this.handleBlur}
        />

        <label className='form-input-label' htmlFor={id}>
          {label}
        </label>

        {this.state.showErrorMessage ? (
          <p className='error-message'>{errorMessage}</p>
        ) : null}
      </Fragment>
    );
  }
}

export default FormInput;
