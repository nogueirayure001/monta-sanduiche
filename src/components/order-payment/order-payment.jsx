import PresentationBoard from "../presentation-board/presentation-board";
import PaymentForm from "../payment-form/payment-form";
import "./order-payment.scss";

const OrderPayment = (props) => (
  <div className='order-payment'>
    <PresentationBoard title='Insira os Dados do Pagamento:'>
      <PaymentForm {...props} />
    </PresentationBoard>
  </div>
);

export default OrderPayment;
