import "./order-menu.scss";
import Illustration from "../illustration/illustration";
import image from "../../assets/images/sanduiche-logo.png";
import SelectionForm from "../selection-form/selection-form";

const OrderMenu = ({ data, orderPhase, updateOrder, updateButtonState }) => {
  return (
    <div className='order-menu'>
      <Illustration image={image} />

      <SelectionForm
        data={data}
        orderPhase={orderPhase}
        updateOrder={updateOrder}
        updateButtonState={updateButtonState}
      />
    </div>
  );
};

export default OrderMenu;
