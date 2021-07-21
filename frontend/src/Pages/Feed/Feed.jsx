import {Col, Row} from "react-bootstrap";
import PostEditor from './PostEditor.jsx';
import PostList from './PostList.jsx'

const Feed = () => {
    return (
        <Row>
            <Col xs={4}>

            </Col>
            <Col xs={8}>
                <Row>
                    <Col xs={12}>
                        <PostEditor/>
                    </Col>
                    <Col xs={12}>
                        <PostList quantityToShow={12}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default Feed
