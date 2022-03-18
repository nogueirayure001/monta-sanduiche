import PageTitle from "../../components/page-title/page-title";
import OrderSummary from "../../components/order-summary/order-summary";
import OrderPayment from "../../components/order-payment/order-payment";
import "./checkout.scss";

const Checkout = (props) => {
  return (
    <main className='checkout-page'>
      <PageTitle title='Monte Seu Sanduíche' />

      <div className='main-content'>
        <OrderSummary {...props} />

        <OrderPayment />
      </div>
    </main>
  );
};

export default Checkout;
