import { useNavigate } from 'react-router-dom';

import { Typography, Col } from "antd";
import { HeartFilled} from '@ant-design/icons';

import { PlaylistInterface } from "../../../Redux/SpotifySlice";
import './Card.css';

const { Title } = Typography;

interface CardInterface {
    playlist: PlaylistInterface
}

const Card = ({
    playlist
}: CardInterface) => {

    const navigate = useNavigate()

    return <Col span={6}
        className="cardHover"
        onClick={()=>navigate("/playlist/"+playlist.id)}
    >
        <div className="card">
            <div className="cardThumbnail"
                style={{background: "linear-gradient(0deg, "+ playlist.randomHex1 +" 0%, "+ playlist.randomHex2 +" 100%)"}}
            >
                { playlist.name == "Liked Songs" ? (
                    <HeartFilled 
                    style={{color:"white", fontSize:30}}
                    className='centeredIconHomepage'/>

                ) : (
                    <></>
                )}
            </div>
            <Title level={4} className="cardName">{playlist.name}</Title>
        </div>
    </Col>

}

export default Card;