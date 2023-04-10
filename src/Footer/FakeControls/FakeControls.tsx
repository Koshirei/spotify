import { ArrowsAltOutlined, SoundOutlined } from "@ant-design/icons";

import './FakeControls.css';
import { faDesktop, faList, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FakeControls = () =>{

    return <div className="FakeControls">
        <FontAwesomeIcon icon={faMicrophone} className="FakeControlsIcon"/>
        <FontAwesomeIcon icon={faList} className="FakeControlsIcon"/>
        <FontAwesomeIcon icon={faDesktop} className="FakeControlsGreen FakeControlsIcon"/>
        <SoundOutlined className="FakeControlsIcon"/>
        <div className="FakeControlsVolumeBar" />
        <ArrowsAltOutlined className="FakeControlsIcon"/>
    </div>
}

export default FakeControls;