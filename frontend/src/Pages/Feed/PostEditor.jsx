import { Card, Button, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

const PostEditor = () => {
  const [individualPost, setIndividualPost] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    setIndividualPost({ ...individualPost, username: "admin" });
    console.log("component did mount");
  }, []);

  const handleChange = (e) => {
    let id = e.target.id;
    setIndividualPost({ ...individualPost, [id]: e.target.value });
  };
  const fileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("cover", selectedFile);
    console.log(individualPost);
    if (selectedFile !== null) {
      let imageRaw = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/image-upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const { url } = await imageRaw.json();
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blogposts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...individualPost,
          image: url,
        }),
      });

      setUploading(false);
    } else {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blogposts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(individualPost),
      });

      setUploading(false);
    }
    // let response = await fetch(
    //   `https://striveschool-api.herokuapp.com/api/posts/`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(individualPost),
    //   }
    // );
    // let data = await response.json();
    // let postID = data._id;

    setTimeout(function () {
      window.location.reload();
    }, 2000); // i hope 2 sec will be enoughh to finish upload hehe
    // window.location.reload();
  };
  return (
      //TODO CSS Consistency
    <Card>
      <Card.Body>
        <div style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Add a post</h2>
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
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostEditor;
