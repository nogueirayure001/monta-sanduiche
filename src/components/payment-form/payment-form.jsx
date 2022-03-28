import { Component, createRef } from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import Modal from "../modal/modal";
import { PAYMENT_FORM_DATA } from "../../assets/data/form.data";
import "./payment-form.scss";

class PaymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payButtonEnabled: false,
      didSucceed: false,
      didFail: false,
    };

    this.nameRef = createRef();
    this.cardNumRef = createRef();
    this.expDateRef = createRef();
    this.cvvRef = createRef();
    this.cpfRef = createRef();

    this.failModal = {
      title: "Pagamento Recusado",
      message:
        "Identificamos que você tentou inserir um número de cartão inválido para tentar nos enganar. Calote aqui não!",
      buttonLabel: "Me Desculpe",
    };

    this.succeedModal = {
      title: "Pagamento Aprovado com Sucesso",
      message: "",
      buttonLabel: "Ok",
    };
  }

  handleChange = () => {
    const { payButtonEnabled } = this.state;
    const { cart } = this.props;

    if (
      this.nameRef.current.isFieldValid() &&
      this.cardNumRef.current.isFieldValid() &&
      this.expDateRef.current.isFieldValid() &&
      this.cvvRef.current.isFieldValid() &&
      this.cpfRef.current.isFieldValid() &&
      cart.length
    ) {
      this.setState({ payButtonEnabled: true });
    } else if (payButtonEnabled) {
      this.setState({ payButtonEnabled: false });
    }
  };

  handleSubmit = async (e) => {
    const { user, clearCart } = this.props;
    const inputFields = e.target;
    const failCardNumber = "111111111111";

    await this.setState({ didFail: false, didSucceed: false });

    const orderInfo = this.getOrderInfo(inputFields);
    // enviar esses dados pro backend para processamento
    // rodar o codigo abaixo de acordo com a resposta recebida

    if (orderInfo.paymentInfo.cardNumber === failCardNumber) {
      await this.setState({ didFail: true });
    } else {
      const { name, cardNumber } = orderInfo.paymentInfo;
      this.updateSuccessMessage(name, cardNumber);

      await this.setState({ didSucceed: true });

      clearCart();

      this.clearLocalStorage(user.uid);

      this.clearInputFields();
    }

    e.preventDefault();
  };

  getOrderInfo = (inputFields) => {
    const { cart } = this.props;

    const orderInfo = {
      cart: cart,
      paymentInfo: {},
    };

    for (const input of inputFields) {
      const { name, value } = input;

      orderInfo.paymentInfo[name] = value;
    }

    return orderInfo;
  };

  clearLocalStorage = (userUid) => {
    localStorage.removeItem(userUid);
  };

  clearInputFields = () => {
    this.nameRef.current.clearField();
    this.cardNumRef.current.clearField();
    this.expDateRef.current.clearField();
    this.cvvRef.current.clearField();
    this.cpfRef.current.clearField();

    this.setState({ payButtonEnabled: false });
  };

  updateSuccessMessage = (name, cardNumber) => {
    const finalDigits = cardNumber.slice(-3);

    this.succeedModal.message = `Muito obrigado pela compra, ${name}, ela foi computada no cartão de final ${finalDigits}. Esperamos que tenha um excelente lanche e que possamos vos atender mais vezes!`;
  };

  render() {
    const [name, cardNum, expDate, cvv, cpf] = PAYMENT_FORM_DATA;
    const { payButtonEnabled, didSucceed, didFail } = this.state;

    return (
      <form
        className='payment-form'
        onSubmit={this.handleSubmit}
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

        {didFail ? <Modal {...this.failModal} /> : null}

        {didSucceed ? <Modal {...this.succeedModal} /> : null}
      </form>
    );
  }
}

export default PaymentForm;
