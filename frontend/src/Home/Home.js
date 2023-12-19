import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link} from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";


const Home = () => {
  // const [data, setData] = useState("");

  // const getData = async () => {
  //   const response = await Axios.get("http://localhost:8080/getData");
  //   setData(response.data);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const msg = new SpeechSynthesisUtterance()
  // msg.text = "Hello World"

  // useEffect(() => {
  //   window.speechSynthesis.speak(msg)
  // }, [msg])

  return (
    <motion.div className="home"
     initial={{ opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{opacity: 0 }}

    >
      {/* {data} */}
        {/* <a href={"/Login"}>Login</a> */}

      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3">
        <div className="col-lg-6 p-3 p-lg-5 pt-lg-3">
          <motion.h1 className="display-3 fw-bold lh-2" initial={{y: 50, opacity: 0}} animate={{y: 0, opacity:1}} transition={{duration: 0.45}}>
            Get an instant skin exam.
          </motion.h1>
          <motion.p className="lead" initial={{y: 50, opacity: 0}} animate={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.2}}>
          Identify your skin problem and learn how to treat it by snapping a photo and View your results and find out if you need medical attention and also Discover causes, symptoms, and treatments for your skin.
          </motion.p>
          <motion.div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3" initial={{y: 50, opacity: 0}} animate={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.2}}>
            <Link
              className="btn btn_color btn-lg px-4 me-md-2 fw-bold"
              to="Upload"
            >
              Start
            </Link>
          </motion.div>
        </div>
        <div className="col-lg-4 offset-lg-2 p-0 overflow-hidden">
          <img
            className="rounded-lg-3"
            src={process.env.PUBLIC_URL + "/home_img.jpeg"}
            alt=""
            width="800"
            style={{position:"relative",left:-70}}
        //     style={{backgroundImage: `url(${process.env.PUBLIC_URL +"/home_img.jpeg"})`,
        // backgroundSize: 'cover' }}
          ></img>
        </div>
      </div>

      <div className="How_to_bg">
        <div className="How_to px-4 py-5" id="icon-grid">
          <motion.h2 className="pb-2 fw-bold" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.3}} viewport={{ once: true }}>How Its Work</motion.h2>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-4 py-3">
          <div className="col d-flex align-items-start">
              <svg
                className="bi text-muted flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"
              >
                <use xlinkHref="#calendar3"></use>
              </svg>
              <div>
                <motion.h3 className=" mb-0 fs-4 " initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>First Login</motion.h3>
                <motion.p className="py-2 text-muted" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>
                  for authentication.
                </motion.p>
              </div>
            </div>

            <div className="col d-flex align-items-start">
              <svg
                className="bi text-muted flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"
              >
                <use xlinkHref="#home"></use>
              </svg>
              <div>
                <motion.h3 className=" mb-0 fs-4 " initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>Take Image</motion.h3>
                 <motion.p className="py-2 text-muted" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>
                  Take image of your skin condition to upload.
                </motion.p>
              </div>
            </div>

            <div className="col d-flex align-items-start">
              <svg
                className="bi text-muted flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
              <div>
                <motion.h3 className=" mb-0 fs-4" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>Submit Photo of your skin</motion.h3>
                <motion.p className="py-2 text-muted" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>
                  From your phone or computer, upload a image of your skin condition and answer a few questions. Using what it has learned from millions of skin-related images, System then looks for signs of various skin conditions in your submitted photos and information.
                </motion.p>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <svg
                className="bi text-muted flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"
              >
                <use xlinkHref="#cpu-fill"></use>
              </svg>
              <div>
                <motion.h3 className=" mb-0 fs-4" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>Receive results</motion.h3>
                <motion.p className="py-2 text-muted" initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.45,delay:0.35}} viewport={{ once: true }}>
                  system will provides you with a list of possible matching skin conditions, and helpful information about each.
                </motion.p>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* About Us */}
      <motion.div
        id="carouselExampleFade"
        className="carousel slide"
        data-bs-ride="carousel"

        initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity:1}} transition={{duration: 0.6,delay:0.5}} viewport={{ once: true }}
      >
        <div className="container mt-5 mb-5 p-5 fs-5 align-items-center rounded-3" style={{backgroundColor:"#F15A59",color:"white"}}>
        <h3 className=" mb-0 fs-4" >Warning:</h3>
        
        It is important to note that AI for skin disease detection is not 100% accurate and can not replace a professional medical diagnosis from a dermatologist.Skin diseases can be complex and often require a thorough evaluation by a dermatologist or other healthcare provider. While AI can be a useful tool in the diagnostic process, it should never replace the expertise and judgment of a qualified medical professional.
        </div>

        
      </motion.div>

      {/* Footer */}

      <div className="footer">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a className="text-muted" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#twitter"></use>
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#instagram"></use>
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-muted" href="#">
                <svg className="bi" width="24" height="24">
                  <use xlinkHref="#facebook"></use>
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </motion.div>
  );
};

export default Home;
