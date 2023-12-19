import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Report.css";
import axios from "../api/axios";

const Report = (props) => {
  // const { state } = useLocation();
  // console.log(state);
  const savedItem = localStorage.getItem("id");
  const parsedItem = JSON.parse(savedItem);
  console.log(parsedItem.id);
  const [id, setId] = useState(parsedItem.id);
  const [temp, setTemp] = useState("");
  const [symptom, setSymptom] = useState("");
  const [causes, setCauses] = useState("");
  const [when, setWhen] = useState("");


  const getReport = () => {
    axios
      .get("/report/edit/" + id, {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);



        axios
          .get("/symptom/get/" + response.data.name, {
            headers: { "content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response2) => {
            console.log(response2.data[0].symptoms);
           let temp = response2.data[0].symptoms.map((d,i) => {return <li style={{ fontWeight: 600 }}>{d}</li>});
        //    console.log(temp);
           setSymptom(temp);
            temp = response2.data[0].causes.map((d,i) => {return <li style={{ fontWeight: 600 }}>{d}</li>});
            // console.log(temp);
           setCauses(temp);
            temp = response2.data[0]["When to see a doctor"].map((d,i) => {return <li style={{ fontWeight: 600 }}>{d}</li>});
            console.log(temp);
            setWhen(temp);
          })
          .catch((error) => {
            console.log(error);
          });




        setTemp(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="container re">
      <div className="container mt-3 mb-3 p-3 align-items-center rounded-3" style={{backgroundColor:"#F15A59",color:"white"}}><h5 className=" mb-0 fs-4" >Warning:</h5>
      It is important to note that AI for skin disease detection is not 100% accurate and can not replace a professional medical diagnosis from a dermatologist.we strongly recommend that you seek additional medical advice before taking any action.
        </div>
      <div className="container row p-3 rounded-3" >
        <div className="col-2 col-re p-0 rounded-3">
          <img
            className="report_img "
            src={process.env.PUBLIC_URL + "/uploads/" + temp?.image}
          />
        </div>
        <div className="col-10 col-re detail_re">
          <p>
            <label className="report_label">Name:</label>
            {temp?.user_id}{" "}
          </p>
          <p>
            <label className="report_label">Data:</label>
            {temp?.time}
          </p>
          <p>
            <label className="report_label">Diseases Name:</label>
            {temp?.name}
          </p>
        </div>
      </div>
      <div className="container row p-3">
        <div className="col-12 ">
          <p style={{ fontWeight: 800 }}>Disease Symptoms</p>
          <ul>
            {symptom}
          </ul>
          <p style={{ fontWeight: 800 }}>Disease causes</p>
          <ul>
            {causes}
          </ul>
          <p style={{ fontWeight: 800 }}>When to see a doctor</p>
          <ul>
            {when}
          </ul> 
        </div>
      </div>
    </div>
  );
};

export default Report;
