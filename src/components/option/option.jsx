import { Fragment } from "react";
import "./option.scss";

const Option = ({
  id,
  multiChoice,
  ingredient,
  option,
  updateOrder,
  prevPrice,
  updatePrevPrice,
  orderPhase,
  prevPhase,
  updatePrevState,
  updateButtonState,
}) => {
  const handleChangeSingle = async (event) => {
    const ingredientKey = event.target.name;
    const ingredientValue = event.target.value;
    const ingredientPrice = option.price;
    const addToDue = ingredientPrice - prevPrice;

    if (orderPhase !== prevPhase) {
      await updateOrder({ [ingredientKey]: ingredientValue }, ingredientPrice);
      await updatePrevState();
    } else {
      await updateOrder({ [ingredientKey]: ingredientValue }, addToDue);
    }

    await updateButtonState(true);

    await updatePrevPrice(ingredientPrice);
  };

  const handleChangeMultiple = async (event) => {
    const checked = event.target.checked;
    const ingredientKey = event.target.name;
    const ingredientValue = event.target.value;
    const ingredientPrice = checked ? option.price : -option.price;
    const addToDue = ingredientPrice;

    await updateOrder(
      { [ingredientKey]: ingredientValue },
      addToDue,
      multiChoice,
      checked
    );
  };

  return (
    <Fragment>
      <input
        className='input'
        id={id}
        type={multiChoice ? "checkbox" : "radio"}
        name={ingredient}
        value={option.name}
        onChange={multiChoice ? handleChangeMultiple : handleChangeSingle}
      />
      <label className='label' htmlFor={id}>
        {option.name}
      </label>
    </Fragment>
  );
};

export default Option;
