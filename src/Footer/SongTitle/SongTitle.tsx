import { useSelector } from "react-redux";
import { currentSongInterface } from "../../Redux/SpotifySlice";
import { HeartOutlined } from "@ant-design/icons";

import './SongTitle.css'

const SongTitle = () => {

    let currentSong: currentSongInterface = useSelector((state:any)=> state.Spotify.currentSong)

    return (
    <div className="footerSongTitleFlex">
        <div className="footerAlbum footeritem" />
        <div className="footerSongTitleFlex2 footeritem">
            <div className="footerTitle">{currentSong.song.title}</div>
            <div className="footerArtist">{currentSong.song.artist}</div>
        </div>
        <div className="footerSongTitleFlex2 footeritem footerSongTitleIcon">
            <HeartOutlined />
        </div>
    </div>
    )

}

export default SongTitle;