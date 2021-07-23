import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

const PostList = (props) => {
  let [postData, setPostData] = useState([
    {
      _id: "loading...",
      text: "loading...",
      username: "loading...",
      createdAt: "loading...",
      updatedAt: "loading...",
      __v: "loading...",
    },
  ]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blogposts`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json",
        // Authorization:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1neM4wsDD60vIc397hg",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setPostData(data.slice(-10).reverse());
      });
  }, []);

  return (
    <Card>
      <Card.Body>
        {postData.map((post) => (
          <Card className="mb-4">
            <Card.Body key={post._id}>
              <SinglePost post={post} />
            </Card.Body>
          </Card>
          /*
                        {
            "_id": null,
            "text": null,
            "username": null,
            "createdAt": null,
            "updatedAt": null,
            "__v": null
        }
                        */
        ))}
      </Card.Body>
    </Card>
  );
};

export default PostList;
