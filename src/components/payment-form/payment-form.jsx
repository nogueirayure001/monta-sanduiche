import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { PAYMENT_FORM_DATA } from "../../assets/data/form.data";
import "./payment-form.scss";

const PaymentForm = () => {
  const [name, cardNum, expDate, cvv, cpf] = PAYMENT_FORM_DATA;

  return (
    <form className='payment-form' onSubmit={(e) => e.preventDefault()}>
      <ul className='input-list'>
        <li className='input-list-item'>
          <FormInput {...name} />
        </li>

        <li className='input-list-item'>
          <FormInput {...cardNum} />
        </li>

        <div className='two-columns-item'>
          <li className='input-list-item'>
            <FormInput {...expDate} />
          </li>

          <li className='input-list-item'>
            <FormInput {...cvv} />
          </li>
        </div>

        <li className='input-list-item'>
          <FormInput {...cpf} />
        </li>
      </ul>

      <Button type='submit'>Pagar</Button>
    </form>
  );
};

export default PaymentForm;
