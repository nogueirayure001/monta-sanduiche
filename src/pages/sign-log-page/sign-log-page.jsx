import { Component } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import PageTitle from "../../components/page-title/page-title";
import { Navigate } from "react-router-dom";
import "./sign-log-page.scss";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";

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
    const { user, routesDidMount } = this.props;
    const { showSignInForm } = this.state;

    const goToShopPage = <Navigate to='/shop' replace={true} />;
    const goToLoadingPage = <Loader />;
    const LogInSignUpPage = (
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

    if (!user) {
      return routesDidMount ? LogInSignUpPage : goToLoadingPage;
    } else {
      return goToShopPage;
    }
  }
}

export default SignInOrLogIn;
