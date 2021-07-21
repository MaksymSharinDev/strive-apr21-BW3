import './SidebarContainer.css'
import {Card} from "react-bootstrap";

import SettingsCard from '../SettingsCard/SettingsCard.jsx'
import AdCard from '../AdCard/AdCard .jsx'
import ProfilesListCard from '../ProfilesListCard/ProfilesListCard.jsx'
import LearningListCard from '../LearningListCard/LearningListCard.jsx'
const SidebarContainer = () =>
    (<>
        <Card  >
            <Card.Body>
                <SettingsCard/>
                <AdCard/>
                <ProfilesListCard heading={'People you maybe known'} quantityToShow={5}/>
                <ProfilesListCard heading={'People from companies you maybe known'} quantityToShow={3}/>
                <LearningListCard/>
            </Card.Body>
        </Card>


    </>)

export default SidebarContainer