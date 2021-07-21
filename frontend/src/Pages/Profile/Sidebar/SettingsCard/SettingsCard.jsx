import {Card, ListGroup, ListGroupItem} from "react-bootstrap";


const SettingsCard = ()=>
    (
        <>

            <Card className={'mb-4'} style={{
                borderRadius: '20px',
                overflow: 'hidden',
            }}>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className={'text-center'}> <a href="#" style={{color: 'black'}}>Edit the public Profile</a>  </ListGroupItem>
                    <ListGroupItem className={'text-center'}> <a href="#" style={{color: 'black'}}>Add your profile in an another language</a> </ListGroupItem>
                </ListGroup>
            </Card>

        </>)

export default SettingsCard