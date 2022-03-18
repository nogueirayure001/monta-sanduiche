import "./order-list.scss";

const transKeyNames = {
  bread: "Pão",
  filling: "Recheio",
  cheese: "Queijo",
  salads: "Salada",
  complement: "Complementos",
  total: "Total",
};

const OrderList = ({ order, title }) => {
  const listItem = [];

  for (const [keyName, value] of Object.entries(order)) {
    if (value.constructor.name === "Array") {
      if (value.length !== 0) {
        listItem.push(
          <li key={keyName}>
            <span className='list-key-name'>{transKeyNames[keyName]}:</span>{" "}
            {value.join(", ")}
          </li>
        );
      }
    } else if (value) {
      listItem.push(
        <li key={keyName}>
          <span className='list-key-name'>{transKeyNames[keyName]}:</span>{" "}
          {value}
        </li>
      );
    }
  }

  return (
    <ul className='order-list'>
      {title ? <h3 className='list-title'>{title}</h3> : null}
      {listItem}
    </ul>
  );
};

export default OrderList;
