import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { SIGN_UP_FORM_DATA } from "../../assets/data/form.data";
import "./sign-up-form.scss";
import { useRef } from "react";
import { signUpUser } from "../../utils/firebase";

const SignUpForm = () => {
  const [name, email, emailConf, pwd, pwdConf] = SIGN_UP_FORM_DATA;
  const [nameRef, emailRef, emailConfRef, pwdRef, pwdConfRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const verifyValidity = () =>
    nameRef.current.getValue() &&
    emailRef.current.getValue() === emailConfRef.current.getValue() &&
    pwdRef.current.getValue() === pwdConfRef.current.getValue();

  const getSignUpData = () => {
    const name = nameRef.current.getValue();
    const email = emailRef.current.getValue();
    const pwd = pwdRef.current.getValue();

    return [name, email, pwd];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (verifyValidity()) {
      signUpUser(...getSignUpData());
    }
  };

  return (
    <form className='sign-up-form' onSubmit={handleSubmit}>
      <ul className='input-list'>
        <li className='input-list-item'>
          <FormInput {...name} ref={nameRef} />
        </li>

        <li className='input-list-item'>
          <FormInput {...email} ref={emailRef} />
        </li>

        <li className='input-list-item'>
          <FormInput {...emailConf} ref={emailConfRef} />
        </li>

        <li className='input-list-item'>
          <FormInput {...pwd} ref={pwdRef} />
        </li>

        <li className='input-list-item'>
          <FormInput {...pwdConf} ref={pwdConfRef} />
        </li>
      </ul>

      <Button type='submit'>Cadastrar</Button>
    </form>
  );
};

export default SignUpForm;
