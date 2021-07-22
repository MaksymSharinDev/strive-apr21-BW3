import {Card} from "react-bootstrap";
//TODO CSS Consistency
const Header = ()=>{
    return(
    <Card style={{ width: '100%' }}>
        <Card.Img variant="top" with={'750px'} src="assets/background.png" />
        <Card.Body>
            <div style={{position: 'absolute'}}>
                <img src={'https://via.placeholder.com/150/000000/FFFFFF/?text=ProfileIMG'} alt={'image'}/>
            </div>
        </Card.Body>
    </Card>)
}
export default Header
