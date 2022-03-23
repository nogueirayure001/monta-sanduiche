import "./order-list.scss";

const transKeyNames = {
  bread: "Pão",
  filling: "Recheio",
  cheese: "Queijo",
  salads: "Salada",
  complement: "Complementos",
};

const OrderList = ({ order, cart }) => {
  let listItem = [];

  if (cart) {
    cart.forEach((item, index) => {
      listItem.push(
        <p key={(index + 1) * Math.random() * 9999} className='how-many'>
          Quantidade: {item.howMany}
        </p>
      );

      for (const [keyName, value] of Object.entries(item.order)) {
        if (value.constructor.name === "Array") {
          if (value.length !== 0) {
            listItem.push(
              <li key={keyName + Math.random() * 9999}>
                <span className='list-key-name'>{transKeyNames[keyName]}:</span>{" "}
                {value.join(", ")}
              </li>
            );
          }
        } else if (value) {
          listItem.push(
            <li key={keyName + Math.random() * 9999}>
              <span className='list-key-name'>{transKeyNames[keyName]}:</span>{" "}
              {value}
            </li>
          );
        }
      }

      listItem.push(
        <div
          key={(index + 1) * Math.random() * 9999}
          className='list-break'
        ></div>
      );
    });
  } else if (order) {
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
  }

  return <ul className='order-list'>{listItem}</ul>;
};

export default OrderList;
