import { Card, Spinner, Button, Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsPencil } from "react-icons/bs";
import styles from "../../../modules/about.module.css";
import { useState, useEffect } from "react";
import AboutModal from "./AboutModal";
import { BiOutline } from "react-icons/bi";

const PDFButton = ({userID}) => {
  console.log( userID )
  return (
      <Button
          href={`/api/v1/profile/${userID}/CV`}>
        download CV
      </Button>
  )
}

const About = () => {
  const [bio, setBio] = useState(" ");
  const [userData, setUserData]  = useState({})
  /*
  _id, username,
  name, surname, email,
  bio, image, title, area,
  createdAt, updatedAt,
  */

  const [isLoading, setLoading] = useState(false);
  const [isShown, setShown] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    setBio("");
    setLoading(true);
    const fetching = async function () {
      let data = await fetch(
        "/api/v1/profile/"
      ).then( d => d.json())
      let userData = data.slice(-1)[0]
      setUserData(userData)
      setBio(userData.bio);
      setLoading(false);
    };
    fetching();
  }, [isShown]);

  const handleChange = (e) => {
    setBio(e.target.value);
  };
  const handleSubmit = async () => {
    await fetch("https://striveschool-api.herokuapp.com/api/profile/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",

      },
      body: JSON.stringify({ bio: bio }),
    });
    setShown(false);
  };
  //TODO CSS Consistency
  return (
    <>
      <Card>
        <div className={'d-flex flex-row justify-content-start align-content-center '}>
          <img className={'mb-3'} src={userData.image}/>
          <div className={'m-3'} >
            <p >{userData.name} {userData.surname}</p>
            <p >{userData.email} </p>
          </div>


        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <h4>About</h4>
          <IconContext.Provider value={{ className: styles.icon }}>
            <div>
              <BsPencil onClick={() => setShown(true)} />
            </div>
          </IconContext.Provider>
        </div>
        <div>
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : bio.length === 0 ? (
            <p>No bio to display</p>
          ) : bio.length > 150 && !isExpanded ?  (
            <>
              <p>{bio.slice(0, 150)}</p>
              <p
                style={{ textAlign: "right" }}
                onClick={() => setExpanded(true)}
              >
                ...show more
              </p>
            </>
          ) : bio.length > 150 && isExpanded ? (
            <p>{bio}</p>
          ) : (
              <p>{bio}</p>
          )}
        </div>
        <PDFButton userID={ userData._id }/>
      </Card>
      {isShown && (
        <div className={styles.modal}>
          <div style={{ padding: "2rem" }}>
            <h4>Edit summary</h4>
            <hr />
            <p>Description</p>

            <Form.Control
              as="textarea"
              value={bio}
              onChange={(e) => handleChange(e)}
              style={{ height: "100px" }}
            />

            {/* <AboutModal bio={bio} /> */}

            <Button variant="success" onClick={() => handleSubmit()}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
