import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import Loading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import mailIcon from "../icons/mailbox.svg";
import "./Dropzone.css";

const Dropzone = ({ onUpload, labels }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setIsLoading(true);
      onUpload(acceptedFiles[0]).then(() => {
        setIsLoading(false);
        toast.success("Image uploaded successfully!");
      });
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <img src={mailIcon} alt="Icon description" />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>
          Drag and drop an image here, or <b className="browse">Browse</b>{" "}
        </p>
      )}
      {isLoading && (
        <div className="loading">
          <Loading type="bubbles" color="#007bff" />
        </div>
      )}
      {labels.length > 0 && (
        <div className="labels">
          <p>Labels detected:</p>
          {labels.map((label, index) => (
            <li key={index} pill bg="info" className="label">
              {label}
            </li>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dropzone;
