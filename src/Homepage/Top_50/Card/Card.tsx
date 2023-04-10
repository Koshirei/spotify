import { useNavigate } from 'react-router-dom';

import { Typography, Col } from "antd";

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

    return <Col span={4}
        onClick={()=>navigate("/playlist/"+playlist.id)}
    >
        <div className="card-top">
            <div className='card-topBox'>
                <div className="card-topThumbnail"
                    style={{background: "linear-gradient(0deg, "+ playlist.randomHex1 +" 0%, "+ playlist.randomHex2 +" 100%)"}}
                    >
                        <Title level={1} >
                            TOP 50
                            <br/>
                            {playlist.name}
                        </Title>
                </div>
            </div>
            <Title level={4} className="card-topName">TOP 50</Title>
            <p className="card-topName">{playlist.name}</p>
        </div>
    </Col>

}

export default Card;