import { useSelector } from "react-redux";
import { currentSongInterface } from "../../Redux/SpotifySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { PlayCircleFilled, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";

import './FakePlayer.css';

const FakePlayer = () => {

    let currentSong: currentSongInterface = useSelector((state:any)=> state.Spotify.currentSong)


    // on fait une combinaison d'icones font awesome et antd car l'un a certaines icones que l'autre n'as pas
    return (
        <div className="fakePlayer">
            <div className="fakePlayerTop">
                <FontAwesomeIcon icon={faShuffle} className="fakePlayerIcon1"/>
                <VerticalRightOutlined className="fakePlayerIcon1"/>
                <PlayCircleFilled className="fakePlayerIcon2"/>
                <VerticalLeftOutlined className="fakePlayerIcon1"/>
                <FontAwesomeIcon icon={faRepeat} className="fakePlayerIcon1"/>
            </div>
            <div className="fakePlayerBottom">
                <span className="fakePlayerTime">0:00 </span>
                <div className="fakePlayerBar"/>
                <span className="fakePlayerTime"> {currentSong.length}</span>
            </div>
        </div>
    )
}

export default FakePlayer;