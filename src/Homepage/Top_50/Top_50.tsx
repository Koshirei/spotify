import { Typography, Row } from "antd";
import Card from "./Card";
import { useSelector } from "react-redux";
import { PlaylistInterface } from "../../Redux/SpotifySlice";

const { Title } = Typography;

const Top_50 = () => {

    const playlists = useSelector((state: any) => state.Spotify.TopPlaylists);

    return <div>
        <Title>TOP 50</Title>
        <Row gutter={[30, 27]}>
            {
                playlists.map((playlist: PlaylistInterface) => {
                    return <Card
                        key={playlist.id}
                        playlist={playlist}
                    />
                })
            }
        </Row>
    </div>
}

export default Top_50