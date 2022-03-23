import { Component } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import PageTitle from "../../components/page-title/page-title";
import { Navigate } from "react-router-dom";
import "./sign-log-page.scss";
import Button from "../../components/button/button";

class SignInOrLogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignInForm: true,
    };
  }

  activateSignInForm = () => {
    this.setState((prevState) => {
      if (prevState.showSignInForm) return;

      return { showSignInForm: true };
    });
  };

  activateSignUpForm = () => {
    this.setState((prevState) => {
      if (!prevState.showSignInForm) return;

      return { showSignInForm: false };
    });
  };

  render() {
    const { user } = this.props;
    const { showSignInForm } = this.state;

    return user ? (
      <Navigate to='/shop' replace={true} />
    ) : (
      <div className='sign-log-page'>
        <PageTitle title='Entre em Sua Conta ou Cadastre-se' />

        <div className='sign-in-sign-up-forms'>
          <div className='forms-wrapper'>
            <div className='select-form'>
              <Button
                type='button'
                handleClick={this.activateSignInForm}
                active={showSignInForm}
              >
                Entrar
              </Button>

              <Button
                type='button'
                handleClick={this.activateSignUpForm}
                active={!showSignInForm}
              >
                Cadastrar
              </Button>
            </div>

            {showSignInForm ? <SignInForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
    );
  }
}

export default SignInOrLogIn;
