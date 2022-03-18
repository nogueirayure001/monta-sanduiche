import "./presentation-board.scss";

const PresentationBoard = ({ children, title }) => (
  <div className='presentation-board'>
    <h2 className='title'>{title}</h2>

    {children}
  </div>
);

export default PresentationBoard;
