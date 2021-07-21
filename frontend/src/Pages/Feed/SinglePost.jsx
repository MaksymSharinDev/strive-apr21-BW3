import { Row, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import styles from "../../modules/singlejob.module.css";
const SinglePost = ({ post }) => {
  const [individualPost, setIndividualPost] = useState(post);
  const [isShown, setShown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const handleChange = (e) => {
    let id = e.target.id;
    setIndividualPost({ ...individualPost, [id]: e.target.value });
  };
  const fileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
      /*
    let response =
    await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/${post._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
        },
        body: JSON.stringify(individualPost),
      }
    );


    let data = await response.json();
    let postID = data._id; */
    setUploading(true);
    const formData = new FormData();
    formData.append("cover", selectedFile);


    if (selectedFile !== null) {
      const imageRaw = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/image-upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const { url } = await imageRaw.json();
      let updated = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/blogposts/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...individualPost, image: url }),
        }
      );
      const updatedPost = await updated.json();
      setIndividualPost(updatedPost);
      setUploading(false);
      setShown(false);
    } else {
      let updated = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/blogposts/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ individualPost }),
        }
      );
      const updatedPost = await updated.json();
      setIndividualPost(updatedPost);
      setUploading(false);
      setShown(false);
    }
  };

  const handleDelete = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/blogposts/${post._id}`,
      {
        method: "DELETE",
        headers: {
          // Authorization:
          //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
        },
      }
    );
    setShown(false);
    window.location.reload();
  };
  return (
    <>
      <div>
        {post?.user?._id === "5d84937322b7b54d848eb41b" && (
          <p className={styles.edit} onClick={() => setShown(true)}>
            EDIT
          </p>
        )}
      </div>
      <Row>
        <h5>{individualPost.username}</h5>
      </Row>
      <Row>
        <p>Created at {individualPost.createdAt}</p>
      </Row>
      <Row>
        <p>updatedAt {individualPost.updatedAt}</p>
      </Row>
      <Row>
        <p style={{ maxHeight: "300px", overflow: "hidden" }}>
          Text: {individualPost.text}
        </p>
      </Row>
      <Row>
        {individualPost?.image?.startsWith("https://") && (
          <img
            src={individualPost.image}
            alt="post"
            style={{ maxWidth: "40%" }}
          />
        )}
      </Row>
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

            <p>Text</p>
            <Form.Control
              id="text"
              as="input"
              value={individualPost.text}
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
    </>
  );
};

export default SinglePost;
