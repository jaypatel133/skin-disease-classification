import { Fragment, useState } from "react";
import axios from "axios";
import "./UploadCard.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./MyDropzone.css";

const UploadCard = (props) => {
  const [file, setFile] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    setFile(
      acceptedFiles.map((dfile) =>
        Object.assign(dfile, {
          preview: URL.createObjectURL(dfile),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("user_id", props.user);
    formData.append("name", "InProcess");
    formData.append("image", file[0].name);

    try {
      const res = await axios.post(
        "http://localhost:8080/report/Create",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("athere was probloem with the server");
      } else {
        console.log(err);
      }
    }
  };

  // useEffect(
  //     () => {
  //         file && URL.revokeObjectURL(file[0].preview);
  //     },
  //     [file]
  //   );

  return (
    <Fragment>
    <div className="col col-lg-3 col-md-6 col-12">
      <div className="card">
        <div className="card_img">
          {file ? (
            <img src={file[0].preview} className="img" alt={file[0].name} />
          ) : (
            <div>
              <div className="p-2">
                <div
                  {...getRootProps()}
                  className="w-full rounded-md cursor-pointer focus:ouline-none Dropzone"
                >
                  <input {...getInputProps()} />

                  <div className="Dropzone_text">
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag 'n' drop img here, or click to select Img</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="card-body cb">
          <h5 className="card-title">Upload Img</h5>
          <input
            type="button"
            value="Upload"
            className="btn btn-primary btn-bloack mt-4 "
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default UploadCard;
