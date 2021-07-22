import { Spinner, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "../../modules/singlejob.module.css";
const NavbarModalView = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const fileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    let response = async () => {
      setUploading(true);
      const formData = new FormData();
      formData.append("profile", selectedFile);
      if (selectedFile !== null) {
        await fetch(
          `https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/picture`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
              // "Content-type": "api/uploadfile",
            },
            body: formData,
          }
        );
      }
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    };
    response();

    // i hope 2 sec will be enoughh to finish upload hehe
    // window.location.reload();
  };
  //TODO CSS Consistency
  return (
    <>
      <div className={styles.modal}>
        <h3>Select your new profile picture</h3>
        <input type="file" onChange={(e) => fileChange(e)} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="success" onClick={() => handleSubmit()}>
            Save
          </Button>
        </div>
        {isUploading && (
          <div style={{ display: "flex" }}>
            <Spinner animation="border" role="status" />
            <h3>Uploading... </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarModalView;
