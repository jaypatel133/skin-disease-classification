import React, { useState,useEffect } from 'react';
import UploadCard from './components/UploadCard';
import Card from './components/Card';
import axios from './api/axios';
import { motion } from "framer-motion";


const Upload = (props) => {
    const [out,setOut] = useState();


    const getReport = () =>{
        axios.get('/report/get/'+props.user,{
            headers:{'content-Type': 'application/json'},
            withCredentials: true
        }).then((response)=>{
          let temp = response.data.map((d,i) => {return <Card key={i} img={'/'+ d.image} Dname={d.name} id={d._id}/> });
          setOut(temp);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(()=>{
        getReport();
    },[]);

    return (
        <motion.div className='container' 
        initial={{ opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{opacity: 0 }}>
            <div className='row p-4'>
                <UploadCard user={props.user}/>

                {out}
                
            </div>
            
        </motion.div>
    );
};

export default Upload;