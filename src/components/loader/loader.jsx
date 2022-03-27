import "./loader.scss";

const Loader = () => {
  return (
    <div className='loading-window'>
      <div className='loader-wrapper'>
        <div className='loader-item'>
          <div className='loader-circle'></div>
          <div className='loader-circle'></div>
        </div>

        <div className='loader-item'>
          <div className='loader-circle'></div>
          <div className='loader-circle'></div>
        </div>

        <div className='loader-item'>
          <div className='loader-circle'></div>
          <div className='loader-circle'></div>
        </div>

        <div className='loader-item'>
          <div className='loader-circle'></div>
          <div className='loader-circle'></div>
        </div>

        <div className='loader-item'>
          <div className='loader-circle'></div>
          <div className='loader-circle'></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
