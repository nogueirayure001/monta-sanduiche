import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { SIGN_IN_FORM_DATA } from "../../assets/data/form.data";
import "./sign-in-form.scss";
import { useRef } from "react";
import { signInUser, signUserWithGooglePopUp } from "../../utils/firebase";

const SignUpForm = () => {
  const [email, pwd] = SIGN_IN_FORM_DATA;
  const [emailRef, pwdRef] = [useRef(null), useRef(null)];

  const getSignInData = () => {
    const email = emailRef.current.getValue();
    const pwd = pwdRef.current.getValue();

    return [email, pwd];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInUser(...getSignInData());
  };

  return (
    <form className='sign-in-form' onSubmit={handleSubmit} noValidate>
      <ul className='input-list'>
        <li className='input-list-item'>
          <FormInput {...email} ref={emailRef} />
        </li>

        <li className='input-list-item'>
          <FormInput {...pwd} ref={pwdRef} />
        </li>
      </ul>

      <div className='button-group'>
        <Button type='submit'>Entrar</Button>

        <Button type='button' handleClick={signUserWithGooglePopUp}>
          Entrar com Google
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
