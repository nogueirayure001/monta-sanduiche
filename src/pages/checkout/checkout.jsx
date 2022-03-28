import PageTitle from "../../components/page-title/page-title";
import OrderSummary from "../../components/order-summary/order-summary";
import OrderPayment from "../../components/order-payment/order-payment";
import { Navigate } from "react-router-dom";
import "./checkout.scss";

const Checkout = (props) => {
  const { user, cart } = props;

  return user ? (
    <main className='checkout-page'>
      <PageTitle title='Pague Seu Sanduíche' />

      <div className='main-content'>
        <OrderSummary cart={cart} />

        <OrderPayment {...props} />
      </div>
    </main>
  ) : (
    <Navigate to='/' replace={true} />
  );
};

export default Checkout;
