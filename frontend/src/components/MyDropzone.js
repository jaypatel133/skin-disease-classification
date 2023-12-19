import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './MyDropzone.css'

function MyDropzone({setFile}) {
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file)
    })
  ));
  }, [])
  const {getRootProps, getInputProps, isDragActive,isDragReject} = useDropzone({onDrop,multiple: false,accept: {
    'image/*': ['.jpeg', '.jpg', '.png'],
   }})

  return (
    <div className='p-2'>
    <div {...getRootProps()} className='w-full rounded-md cursor-pointer focus:ouline-none Dropzone'>
      <input {...getInputProps()} />

      <div className='Dropzone_text'>{
        isDragActive ?
          <p>Drop the files here ...</p> :
            <p>Drag 'n' drop img here, or click to select Img</p>}
      </div>
    </div>
    </div>
  )
}

export default MyDropzone;