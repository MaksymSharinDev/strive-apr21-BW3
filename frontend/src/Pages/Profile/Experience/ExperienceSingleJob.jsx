import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import styles from "../../../modules/singlejob.module.css";
const SingleJob = ({ job }) => {
  const [isShown, setShown] = useState(false);
  const [exp, setExp] = useState(job);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const handleChange = (e) => {
    let id = e.target.id;
    setExp({ ...exp, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    let response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/experiences/${exp._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
        },
        body: JSON.stringify(exp),
      }
    );
    let data = await response.json();
    let expID = data._id;
    setUploading(true);
    const formData = new FormData();
    formData.append("experience", selectedFile);
    if (selectedFile !== null) {
      await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/experiences/${expID}/picture`,
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
    }, 2000); // i hope 2 sec will be enoughh to finish upload hehe
    // window.location.reload();
  };
  const fileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/experiences/${exp._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
        },
      }
    );
    setShown(false);
    window.location.reload();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>Role: {job.role}</p>
          <p>Company: {job.company}</p>
          <p>Description: {job.description}</p>
          <p>Start Date: {job.startDate}</p>
          <p>End date: {job.endDate}</p>
          <p>Area: {job.area}</p>
          {job.image && (
            <img src={job.image} alt="job" style={{ maxWidth: "20%" }} />
          )}
        </div>
        <div>
          <p className={styles.edit} onClick={() => setShown(true)}>
            EDIT
          </p>
        </div>
      </div>
      {isShown && (
        <div className={styles.modal}>
          <div style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Edit your experience</h2>
              <h2 className={styles.edit} onClick={() => setShown(false)}>
                Close
              </h2>
            </div>
            <hr />

            <p>Role</p>
            <Form.Control
              id="role"
              as="input"
              value={exp.role}
              onChange={(e) => handleChange(e)}
            />

            <p>Company</p>
            <Form.Control
              id="company"
              as="input"
              value={exp.company}
              onChange={(e) => handleChange(e)}
            />

            <p>Start date</p>
            <Form.Control
              id="startDate"
              as="input"
              type="text"
              value={exp.startDate}
              onChange={(e) => handleChange(e)}
            />

            <p>End date</p>
            <Form.Control
              id="endDate"
              type="text"
              as="input"
              value={exp.endDate}
              onChange={(e) => handleChange(e)}
            />

            <p>Description</p>
            <Form.Control
              id="description"
              as="input"
              value={exp.description}
              onChange={(e) => handleChange(e)}
            />

            <p>Area</p>
            <Form.Control
              id="area"
              as="input"
              value={exp.area}
              onChange={(e) => handleChange(e)}
            />

            <input type="file" onChange={(e) => fileChange(e)} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="success" onClick={() => handleSubmit()}>
                Save
              </Button>
              {isUploading && (
                <>
                  <div style={{ display: "flex" }}>
                    <Spinner animation="border" role="status" />
                    <h3>Uploading... </h3>
                  </div>
                </>
              )}
              <Button variant="danger" onClick={() => handleDelete()}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      <hr />
    </>
  );
};

export default SingleJob;
