import img from '../../assets/loader.png';

const Preloader = () => (
  <div className="divLoader">
    <span>
      <img
        src={img}
        className="loader"
        alt="logo"
      />
    </span>
    <span className="loader-bar" />
  </div>
);

export default Preloader;
