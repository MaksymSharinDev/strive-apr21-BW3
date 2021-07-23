import {useState, useEffect} from "react";
import {Spinner, Form, Button} from "react-bootstrap";
import styles from "../../../modules/exp.module.css";
import SingleJob from "./ExperienceSingleJob";
import './Experience.css'
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
    const [shouldFetch, setShouldFetch] = useState( false )

    const fetchingExperience = async function () {
        setExp([]);
        setLoading(true);
        const expData =
            await fetch(`/api/v1/profile/${'admin'}/experiences`)
                .then(data => data.json())
        console.log(expData)
        setExp(expData)
        setLoading(false)
        setShouldFetch(false)
    }
    useEffect( function ()  {
        fetchingExperience()
    }, [isShown ]);
    useEffect( function ()  {
        if ( shouldFetch) 
            fetchingExperience()
    }, [shouldFetch ]);

    const handleAdd = async () => {
        setShown(true);
    };
    const handleSubmit = async () => {
        (function normalizeData() {
            setJob({
                ...job,
                startDate: job.startDate.replace('-', '/'),
                endDate: job.endDate.replace('-', '/')
            })
        })()
        const createExpResponseObj = await fetch(
            `/api/v1/profile/${'admin'}/experiences`,
            {
                method: 'POST',
                headers: {
                    contentType: 'application/json'
                },
                body: JSON.stringify(job)
            }
        ).then( data => data.json());
        const expID = createExpResponseObj._id

      const formData  = new FormData();
      formData.append('expPic' , selectedFile )
      const uploadPicResponse = await fetch(
          `/api/v1/profile/${'admin'}/experiences/${expID}/picture`,
          {
            method: 'POST',
            headers:{
              contentType: 'multipart/form-data'
            },
            body: formData
          }
      ).then( data => data.json());
        
    };
    const handleChange = (e) => {
        let id = e.target.id;
        setJob({...job, [id]: e.target.value});
    };
    const fileChange = async (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h2>Experience</h2>
                <h2 className={styles.addNew} onClick={() => handleAdd()}>
                    +
                </h2>
            </div>
            <hr/>
            <div>
                {isShown && (
                    <div className={'expForm'} >
                        <div style={{padding: "2rem"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h2>Add new experience</h2>
                                <h2 onClick={() => setShown(false)}>Close</h2>
                            </div>
                            <hr/>

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
                            <input type="file" onChange={(e) => fileChange(e)}/>

                            <Button variant="success" onClick={() => handleSubmit()}>
                                Save
                            </Button>
                            {isUploading && (
                                <>
                                    <div style={{display: "flex"}}>
                                        <Spinner animation="border" role="status"/>
                                        <h3>Uploading... </h3>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
                {isLoading ? (
                    <Spinner animation="border" role="status"/>
                ) : exp.length === 0 ? (
                    <p>There's no experience to display</p>
                ) : exp.length >= 5 && !isExpanded ? (
                    <>
                        {exp.slice(0, 5).map((job) => (
                            <div key={job._id}>
                                <SingleJob job={job}  refreshExperiences={() => setShown(true)}/>
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
                                <SingleJob job={job} refreshExperiences={() => setShown(true)}/>
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
                                <SingleJob job={job} refreshExperiences={() => setShown(true)}/>
                            </div>
                        ))}
                    </>
                ) : (
                    ""
                )}
            </div>

        </>
    );
};

export default Experience;
