import { useNavigate } from "react-router-dom";
import FittedImg from 'react-fitted-img'

const Card = (props) => {
  const navigate = useNavigate();
  const imgPath = process.env.PUBLIC_URL + "/uploads" + props.img;

  const handelCLick = () =>{
    localStorage.setItem('id',JSON.stringify({id:props.id})); 

    // {state:{id:props.id}}
    navigate('/report');
  }
  // console.log(props)

  return (
    <div className="col col-lg-3 col-md-6 col-12">
      <div className="card m-1">
        <div className="card_img" style={{backgroundImage: `url(${imgPath})`,
        backgroundSize: 'cover' }}>
          {/* <img
            src={process.env.PUBLIC_URL + "/uploads" + props.img}
            className="card-img-top img"
            alt="..."
          /> */}
        </div>
        <div className="card-body cb">
          <h5 className="card-title">{props.Dname}</h5>
          <br />
          <button
            className="btn btn-primary"
            onClick={handelCLick}
            disabled={props.Dname === "InProcess"?true:false}
          >
            Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
