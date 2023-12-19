import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';
import MyDropzone from '../components/MyDropzone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const img={
    width: 100,
    height: 100
}

const Demo = () => {
    const [file,setFile]=useState();
    const [button,setButton]=useState(false);

    // const [uploadedFile,setUploadedFile]= useState();

    const buttonControl = () =>{
        if(listening == true)
        {
            SpeechRecognition.stopListening();   
        }
        else{
            SpeechRecognition.startListening();
        }
    }

    const onSubmit = async e =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('file',file[0]);

        try{
            const res = await axios.post('http://localhost:8080/upload',formData,{
                headers:{
                    'Content-type': 'multipart/form-data'
                }
            });

            const { fileName,filePath} = res.data;

            // setUploadedFile({fileName,filePath});
        }
        catch(err)
        {
            if(err.response.status === 500)
            {
                console.log('athere was probloem with the server');
            }
            else
            {
                console.log(err.response.data.msg);
            }
        }
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();



    useEffect(
        () => () => {
            file && URL.revokeObjectURL(file[0].preview)            
        },
        [file]
      );

    // useEffect(()=>{
    //     if (!browserSupportsSpeechRecognition) {
    //         return <span>Browser doesn't support speech recognition.</span>;
    //     }
    // },[]);

    return (
        <div>
            <FileUpload/>
            <form onSubmit={onSubmit}>
            
                {file ? <img src={file[0].preview} style={img} alt={file[0].name} />:<div><MyDropzone setFile={setFile} /> </div>}
                <input type='submit' value='Upload' className='btn btn-primary btn-bloack mt-4 '/>
                {console.log(file)}
            </form>
            {/* SpeechRecognition.startListening */}
            <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={buttonControl}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
            </div>

        </div>
    );
};

export default Demo;