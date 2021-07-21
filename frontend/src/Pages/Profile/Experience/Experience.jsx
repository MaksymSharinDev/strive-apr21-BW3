import { useState, useEffect } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import styles from "../../../modules/exp.module.css";
import SingleJob from "./ExperienceSingleJob";
const Experience = () => {
  const [exp, setExp] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [isShown, setShown] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [job, setJob] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: null,
    description: "",
    area: "",
  });
  useEffect(() => {
    setExp([]);
    setLoading(true);
    const fetching = async function () {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/experiences",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
          },
        }
      );
      let expData = await response.json();
      setExp(expData);
      setLoading(false);
    };
    fetching();
  }, [isShown]);

  const handleAdd = async () => {
    setShown(true);
  };

  const handleSubmit = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/profile/60c71dfc291930001560ab9a/experiences",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
        },
        body: JSON.stringify(job),
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
    }, 2000);
  };

  const handleChange = (e) => {
    let id = e.target.id;
    setJob({ ...job, [id]: e.target.value });
  };

  const fileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Experience</h2>
        <h2 className={styles.addNew} onClick={() => handleAdd()}>
          +
        </h2>
      </div>
      <hr />
      <div>
        {isLoading ? (
          <Spinner animation="border" role="status" />
        ) : exp.length === 0 ? (
          <p>There's no experience to display</p>
        ) : exp.length >= 5 && !isExpanded ? (
          <>
            {exp.slice(0, 5).map((job) => (
              <div key={job._id}>
                <SingleJob job={job} />
              </div>
            ))}
            <p onClick={() => setExpanded(true)}>
              {isExpanded ? "Show Less" : "Show more"}
            </p>
          </>
        ) : exp.length >= 5 && isExpanded ? (
          <>
            {exp.map((job) => (
              <div key={job._id}>
                <SingleJob job={job} />
              </div>
            ))}
            <p onClick={() => setExpanded(false)}>
              {isExpanded ? "Show Less" : "Show more"}
            </p>
          </>
        ) : exp.length < 5 ? (
          <>
            {exp.map((job) => (
              <div key={job._id}>
                <SingleJob job={job} />
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
      {isShown && (
        <div className={styles.modal}>
          <div style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Add new experience</h2>
              <h2 onClick={() => setShown(false)}>Close</h2>
            </div>
            <hr />

            <p>Role</p>
            <Form.Control
              id="role"
              as="input"
              value={job.role}
              onChange={(e) => handleChange(e)}
            />

            <p>Company</p>
            <Form.Control
              id="company"
              as="input"
              value={job.company}
              onChange={(e) => handleChange(e)}
            />

            <p>Start date</p>
            <Form.Control
              id="startDate"
              as="input"
              type="date"
              value={job.startDate}
              onChange={(e) => handleChange(e)}
            />

            <p>End date</p>
            <Form.Control
              id="endDate"
              type="date"
              as="input"
              value={job.endDate}
              onChange={(e) => handleChange(e)}
            />

            <p>Description</p>
            <Form.Control
              id="description"
              as="input"
              value={job.description}
              onChange={(e) => handleChange(e)}
            />

            <p>Area</p>
            <Form.Control
              id="area"
              as="input"
              value={job.area}
              onChange={(e) => handleChange(e)}
            />
            <p>Image</p>
            <input type="file" onChange={(e) => fileChange(e)} />

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
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
