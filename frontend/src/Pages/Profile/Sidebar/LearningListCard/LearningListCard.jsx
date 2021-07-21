import {Card, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";

const LearningListCard = ()=>
    <Card >
        <Card.Body>
            <Card.Text>
               <h4> learn a new skills free for 24 hours</h4>
            </Card.Text>
        </Card.Body>

        <ListGroup variant="flush">
            {
                [...new Array(3)].map( () => (
                    <ListGroup.Item>
                        <Row className={'no-gutters'}>
                            <Col xs={6} className={'justify-items-center align-content-center'}>
                                <img src={'https://via.placeholder.com/120x60.png'} width={'120px'} height={'60px'} alt={'courseIMG'}/>
                            </Col>
                            <Col xs={6}>

                                    <h6 className={'mb-4 '}> Course Title</h6>
                                    <h6 style={{fontSize: '0.8em' , color: 'rgb(107, 105, 105)'}}>xxxx visuals</h6>


                            </Col>
                        </Row>

                    </ListGroup.Item>)
                )
            }
            <ListGroup.Item>
            <a href={'#'} style={{fontSize: '1.2em' , color: 'rgb(107, 105, 105)',fontWeight:'bolder' }}>Show more on Linkedin Learning</a>
            </ListGroup.Item>


        </ListGroup>
    </Card>
export default LearningListCard