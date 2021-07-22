import {Card, Row, Col, Container} from "react-bootstrap";
import activityList from "../../../../data/activities.json";
import {useState} from "react";
import styles from "../../../../modules/skills.module.css";

const Activities = () => {
    const [activity, setActivity] = useState(activityList.activities);
    //TODO CSS Consistency
    return (
        <Card>
            <Container>
                <h4>Activity</h4>
                <a href="/">69 followers</a>
                <Row>
                    {activity.map((item) => (
                        <Col xs={6}>
                            <div key={item.id} style={{display: "flex"}}>
                                <div>
                                    <img
                                        src={item.userPic}
                                        alt="has to be user's face"
                                        style={{
                                            borderRadius: "6rem",
                                            margin: "1rem",
                                            maxWidth: "60%",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h5>{item.preview}</h5>
                                    <span>User {item.type}</span>
                                </div>
                            </div>
                        </Col>
                    ))}
                    <Col xs={6} >
                        <a
                            href="/"
                            className={styles.expander }
                            style={{textDecoration: "none" }}
                        >
                            See all activity
                        </a>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
};

export default Activities;
