import { HeartFilled } from "@ant-design/icons";
import { PlaylistInterface } from "../../Redux/SpotifySlice";

import { Typography } from "antd";
import './Header.css';


const { Title } = Typography;

interface HeaderInterface {
    playlist: PlaylistInterface
}

const Header = ({
    playlist
}: HeaderInterface ) => {

    return <div 
        className="PlaylistHeader"
        style={{background: "linear-gradient(180deg, "+ playlist.randomHex1 +" 0%, "+ playlist.randomHex2 +" 100%)"}}
        >
            <div className="PlaylistHeaderWrapper">
                <div 
                className="PlaylistHeaderSquare"
                style={{background: "linear-gradient(0deg, "+ playlist.randomHex1 +" 0%, "+ playlist.randomHex2 +" 100%)"}}
                >
                    {playlist.name === "Liked Songs" ? (
                        <HeartFilled
                        style={{ color: "white", fontSize: 50 }}
                        className='centeredIconHomepage'
                        />
                        
                        ) : (
                            <></>
                            )}
                </div>
                <div className="PlaylistHeaderTitle"> 
                    <Title level={1} className="card-userName" style={{fontSize:"500%"}}>{playlist.name}</Title>
                </div>
            </div>
    </div>
}

export default Header