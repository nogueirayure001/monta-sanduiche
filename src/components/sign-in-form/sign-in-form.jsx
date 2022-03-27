import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { SIGN_IN_FORM_DATA } from "../../assets/data/form.data";
import "./sign-in-form.scss";
import { signInUser, signUserWithGooglePopUp } from "../../utils/firebase";
import { Component, createRef } from "react";

const errorList = {
  "Firebase: Error (auth/user-not-found).": "Usuário não encontrado",
  "Firebase: Error (auth/invalid-email).": "Email inválido",
  "Firebase: Error (auth/user-disabled).": "Usuário bloqueado",
  "Firebase: Error (auth/wrong-password).": "Senha incorreta",
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
    };

    this.emailRef = createRef();
    this.pwdRef = createRef();
  }

  getSignInData = () => {
    const emailValue = this.emailRef.current.getValue();
    const pwdValue = this.pwdRef.current.getValue();

    return [emailValue, pwdValue];
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsValid = e.target.checkValidity();

    if (!allFieldsValid) {
      this.emailRef.current.handleBlur();
      this.pwdRef.current.handleBlur();

      return;
    }

    const result = await signInUser(...this.getSignInData());

    if (result) {
      this.setState({ errorMessage: errorList[result] });
    } else {
      this.setState({ errorMessage: "" });
    }
  };

  render() {
    const [email, pwd] = SIGN_IN_FORM_DATA;
    const { errorMessage } = this.state;

    return (
      <form className='sign-in-form' onSubmit={this.handleSubmit} noValidate>
        <ul className='input-list'>
          <li className='input-list-item'>
            <FormInput {...email} ref={this.emailRef} />
          </li>

          <li className='input-list-item'>
            <FormInput {...pwd} ref={this.pwdRef} />
          </li>
        </ul>

        {errorMessage ? (
          <p className='form-error-message'>{errorMessage}</p>
        ) : null}

        <div className='button-group'>
          <Button type='submit'>Entrar</Button>

          <Button type='button' handleClick={signUserWithGooglePopUp}>
            Entrar com Google
          </Button>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
