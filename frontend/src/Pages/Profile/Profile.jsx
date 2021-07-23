
import Activities from "./Formation/FormationSection/Activities";
import Skills from "./Formation/FormationSection/Skills";
import About from "./Formation/About";
import ExperienceContainer from "./Experience/ExperienceContainer";
import {Button} from "react-bootstrap";



const Profile = () => (
    <>

        <About/>
        <Activities/>
        <ExperienceContainer/>
        <Skills/>
    </>
)
export default Profile
