import { useSelector } from 'react-redux';

import { PlaylistInterface } from '../../Redux/SpotifySlice';
import Card from './Card';

import { Typography, Row } from "antd";
const { Title } = Typography;

const Your_playlists = () => {

    const playlists = useSelector((state: any) => state.Spotify.UserPlaylists);

    return <div>
        <Title>Your Playlists</Title>

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

export default Your_playlists;