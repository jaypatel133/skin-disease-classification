import React,{Fragment,useState} from 'react';
import axios from 'axios';


const FileUpload = () => {
    const [file,setFile]= useState('');
    const [fileName,setFileName]= useState('Choose File');
    const [uploadedFile,setUploadedFile]= useState({});


    const onChange = e =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name );

    }

    const onSubmit = async e =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('file',file);
        // formData.append('user_id','some');
        // formData.append('name','some1');
        // formData.append('image',fileName);
        // report/Create
        

        try{
            const res = await axios.post('http://localhost:8080/upload',formData,{
                headers:{
                    'Content-type': 'multipart/form-data'
                }
            });

            console.log(res)

            // const { fileName,filePath} = res.data;

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
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
            <div className="mb-3">

                <input className="form-control" type="file" id="formFile" onChange={onChange}/>
            </div>
            
            <input type='submit' value='Upload' className='btn btn-primary btn-bloack mt-4 '/>
            </form>  
            {/* <p>{fileName}</p>  */}
            

        </Fragment>
    );
};

export default FileUpload; 