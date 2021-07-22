import {Card, Col, Row} from 'react-bootstrap'
import {useEffect, useState} from "react";


const ProfilesListCard = (props) => {
    let [profiles, setProfiles] = useState(false)
    useEffect(
        () => {
            fetch('https://striveschool-api.herokuapp.com/api/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
                        '.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM' +
                        '2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1ne' +
                        'M4wsDD60vIc397hg')
                },
            })
                .then(r => r.json())
                .then((data) => {
                    let tmpArr = [];
                    for (let I = 0; I < props.quantityToShow; I++) {
                        let randomIndex = Math.floor(Math.random() * data.length);
                        tmpArr.push(data[randomIndex])
                    }
                    setProfiles(tmpArr)
                })
        }, [])
    return (
        <>
            <h4 className={'mb-3'}>
                {props.heading}
            </h4>
            {
                ((n) => {
                    let arr = []
                    for (let I = 0; I < n; I++) {
                        arr.push(
                            <Card className={'mb-3'}>
                                <Card.Body>
                                    {profiles && <Profile id={profiles[I]._id}/>}
                                </Card.Body>
                            </Card>
                        )
                    }
                    return arr
                })(props.quantityToShow)
            }

        </>)
}
const Profile = (props) => {
    let [loading, setLoading] = useState(true)
    let [profileData, setProfileData] = useState(false)
    useEffect(
        () => {
            fetch(
                `https://striveschool-api.herokuapp.com/api/profile/${props.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': ('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
                            '.eyJfaWQiOiI2MGM3MWRmYzI5MTkzMDAwMTU2MGFiOWEiLCJpYXQiOjE2MjM' +
                            '2NjIwNzcsImV4cCI6MTYyNDg3MTY3N30.S-4OzceDjWQt4-jFgqD0QsGS1ne' +
                            'M4wsDD60vIc397hg')
                    },
                })
                .then(r => r.json())
                .then((data) => {
                    setProfileData(data)
                })
        }, [])
    //TODO CSS Consistency
    return (
        <Row>
            <Col xs={3} style={{paddingTop: '5px'}}>
                {
                    profileData
                        ? <img src={profileData.image}
                               style={{height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover'}}
                               alt={'profileImage'}/>
                        : <div style={{backgroundColor: 'grey', height: '60px', width: '60px', borderRadius: '50%'}}/>
                }

            </Col>
            <Col xs={9} style={{paddingTop: '5px'}}>
                {
                    profileData
                        ? <div style={{
                            height: '75px',
                            overflow: 'hidden',
                        }}>
                            <h5> {profileData.name + ' ' + profileData.surname}</h5>
                            <h6> {profileData.title}</h6>
                            {/*  <p> {profileData.bio}</p> */}
                        </div>
                        : <p style={{backgroundColor: 'gray', height: '75px'}}/>
                }


            </Col>
        </Row>)
}
export default ProfilesListCard