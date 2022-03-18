import "./selection-form.scss";
import OptionsList from "../options-list/options-list";

const SelectionForm = ({
  data,
  orderPhase,
  updateOrder,
  updateButtonState,
}) => {
  const foodData = data[orderPhase];
  const { title, subtitle } = foodData;

  return (
    <form className='selection-form'>
      <div className='content-titles'>
        <h2 className='title'>{title}</h2>
        {subtitle ? <p className='subtitle'>{subtitle}</p> : null}
      </div>

      <OptionsList
        foodData={foodData}
        updateOrder={updateOrder}
        orderPhase={orderPhase}
        updateButtonState={updateButtonState}
        key={`${orderPhase}`}
      />
    </form>
  );
};

export default SelectionForm;
