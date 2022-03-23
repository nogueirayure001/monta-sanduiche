import "./order-summary.scss";
import Illustration from "../illustration/illustration";
import OrderList from "../order-list/order-list";
import image from "../../assets/images/sanduiche-logo.png";

const OrderSummary = ({ cart }) => {
  const totalAmountDue = cart.reduce((acc, current) => {
    return acc + current.amountDue * current.howMany;
  }, 0);

  return (
    <div className='order-summary'>
      <Illustration image={image} />

      <p className='thanks-message'>Obrigado pela Preferência!</p>

      <div className='order-list-wrapper'>
        <h3 className='list-title'>Resumo do Pedido:</h3>

        <OrderList cart={cart} />

        <p>
          <span className='order-total'>Total:</span> R${" "}
          {totalAmountDue.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
