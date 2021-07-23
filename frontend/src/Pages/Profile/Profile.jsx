
import Activities from "./Formation/FormationSection/Activities";
import Skills from "./Formation/FormationSection/Skills";
import About from "./Formation/About";
import ExperienceContainer from "./Experience/ExperienceContainer";
import {Button} from "react-bootstrap";

const PDFButton = () => {
    let _id = '60f59083c787c18bbe53e3e9'
    return (
        <Button

            href={`/api/v1/profile/${_id}/CV`}>
            download CV
        </Button>
    )
}

const Profile = () => (
    <>
        <PDFButton/>        
        <About/>
        <Activities/>
        <ExperienceContainer/>
        <Skills/>
    </>
)
export default Profile
