import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { SIGN_UP_FORM_DATA } from "../../assets/data/form.data";
import "./sign-up-form.scss";
import { Component, createRef } from "react";
import { signUpUser } from "../../utils/firebase";

const errorList = {
  "Firebase: Error (auth/email-already-in-use).": "Email já esta em uso",
  "Firebase: Error (auth/invalid-email).": "Email inválido",
  "Firebase: Error (auth/operation-not-allowed).": "Operação não permitida",
  "Firebase: Error (auth/weak-password).": "Senha muito fraca",
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
    };

    this.nameRef = createRef();
    this.emailRef = createRef();
    this.emailConfRef = createRef();
    this.pwdRef = createRef();
    this.pwdConfRef = createRef();
  }

  verifyValidity = () => {
    return (
      this.nameRef.current.getValue() &&
      this.emailRef.current.getValue() ===
        this.emailConfRef.current.getValue() &&
      this.pwdRef.current.getValue() === this.pwdConfRef.current.getValue()
    );
  };

  getSignUpData = () => {
    const nameValue = this.nameRef.current.getValue();
    const emailValue = this.emailRef.current.getValue();
    const pwdValue = this.pwdRef.current.getValue();

    return [nameValue, emailValue, pwdValue];
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsValid = e.target.checkValidity();

    if (!allFieldsValid) {
      this.nameRef.current.handleBlur();
      this.emailRef.current.handleBlur();
      this.emailConfRef.current.handleBlur();
      this.pwdRef.current.handleBlur();
      this.pwdConfRef.current.handleBlur();
      return;
    }

    const result = await signUpUser(...this.getSignUpData());

    if (result) {
      this.setState({ errorMessage: errorList[result] });
    } else {
      this.setState({ errorMessage: "" });
    }
  };

  render() {
    const [name, email, emailConf, pwd, pwdConf] = SIGN_UP_FORM_DATA;
    const { errorMessage } = this.state;

    return (
      <form className='sign-up-form' onSubmit={this.handleSubmit} noValidate>
        <ul className='input-list'>
          <li className='input-list-item'>
            <FormInput {...name} ref={this.nameRef} />
          </li>

          <li className='input-list-item'>
            <FormInput {...email} ref={this.emailRef} />
          </li>

          <li className='input-list-item'>
            <FormInput {...emailConf} ref={this.emailConfRef} />
          </li>

          <li className='input-list-item'>
            <FormInput {...pwd} ref={this.pwdRef} />
          </li>

          <li className='input-list-item'>
            <FormInput {...pwdConf} ref={this.pwdConfRef} />
          </li>
        </ul>

        {errorMessage ? (
          <p className='form-error-message'>{errorMessage}</p>
        ) : null}

        <Button type='submit'>Cadastrar</Button>
      </form>
    );
  }
}

export default SignUpForm;
