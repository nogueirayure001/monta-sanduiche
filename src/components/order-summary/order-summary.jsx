import "./order-summary.scss";
import Illustration from "../illustration/illustration";
import OrderList from "../order-list/order-list";
import image from "../../assets/images/sanduiche-logo.png";

const OrderSummary = ({ order, amountDue }) => (
  <div className='order-summary'>
    <Illustration image={image} />

    <p className='thanks-message'>Obrigado pela Preferência!</p>

    <div className='order-list-wrapper'>
      <OrderList
        order={{
          ...order,
          total: `R$ ${amountDue.toFixed(2).replace(".", ",")}`,
        }}
        title='Resumo do Pedido:'
      />
    </div>
  </div>
);

export default OrderSummary;
