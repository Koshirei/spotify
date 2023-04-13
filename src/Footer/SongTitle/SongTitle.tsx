import { useSelector } from "react-redux";
import {useEffect, useState} from "react"
import { SongDataInterface, currentSongInterface } from "../../Redux/SpotifySlice";
import { HeartOutlined } from "@ant-design/icons";

import './SongTitle.css'
import FavoriteBtn from "../../FavoriteBtn";

const SongTitle = () => {

    let currentSong: currentSongInterface = useSelector((state:any)=> state.Spotify.currentSong)

    return (
    <div className="footerSongTitleFlex">
        <div 
            className="footerAlbum footeritem" 
            style={{ background: "linear-gradient(0deg, " + currentSong.album.split("|")[0] + " 0%, " + currentSong.album.split("|")[1] + " 100%)" }}
        />
        <div className="footerSongTitleFlex2 footeritem">
            <div className="footerTitle">{currentSong.song.title}</div>
            <div className="footerArtist">{currentSong.song.artist}</div>
        </div>
    </div>
    )

}

export default SongTitle;