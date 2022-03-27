import { Component, createRef } from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { PAYMENT_FORM_DATA } from "../../assets/data/form.data";
import "./payment-form.scss";

class PaymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payButtonEnabled: false,
    };

    this.nameRef = createRef();
    this.cardNumRef = createRef();
    this.expDateRef = createRef();
    this.cvvRef = createRef();
    this.cpfRef = createRef();
  }

  handleChange = () => {
    const { payButtonEnabled } = this.state;

    if (
      this.nameRef.current.isFieldValid() &&
      this.cardNumRef.current.isFieldValid() &&
      this.expDateRef.current.isFieldValid() &&
      this.cvvRef.current.isFieldValid() &&
      this.cpfRef.current.isFieldValid()
    ) {
      this.setState({ payButtonEnabled: true });
    } else if (payButtonEnabled) {
      this.setState({ payButtonEnabled: false });
    }
  };

  render() {
    const [name, cardNum, expDate, cvv, cpf] = PAYMENT_FORM_DATA;
    const { payButtonEnabled } = this.state;

    return (
      <form
        className='payment-form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onChange={this.handleChange}
        noValidate
      >
        <ul className='input-list'>
          <li className='input-list-item'>
            <FormInput {...name} ref={this.nameRef} />
          </li>

          <li className='input-list-item'>
            <FormInput {...cardNum} ref={this.cardNumRef} />
          </li>

          <div className='two-columns-item'>
            <li className='input-list-item'>
              <FormInput {...expDate} ref={this.expDateRef} />
            </li>

            <li className='input-list-item'>
              <FormInput {...cvv} ref={this.cvvRef} />
            </li>
          </div>

          <li className='input-list-item'>
            <FormInput {...cpf} ref={this.cpfRef} />
          </li>
        </ul>

        <Button type='submit' disabled={!payButtonEnabled}>
          Pagar
        </Button>
      </form>
    );
  }
}

export default PaymentForm;
