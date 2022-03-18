import "./illustration.scss";

const illustration = ({ image }) => (
  <div className='illustration-wrapper'>
    <div
      className='illustration'
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  </div>
);

export default illustration;
