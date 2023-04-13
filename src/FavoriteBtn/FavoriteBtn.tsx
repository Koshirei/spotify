import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { PlaylistInterface, SongDataInterface, removeSongFromFavorites, addSong2Favorites } from "../Redux/SpotifySlice";
import { useDispatch, useSelector} from 'react-redux';
import './FavoriteBtn.css'

interface FavoriteBtnInterface {
    song: SongDataInterface
}

const FavoriteBtn = ({
    song
}: FavoriteBtnInterface) => {

    let FavoritePlaylist:PlaylistInterface = useSelector((state:any)=>state.Spotify.UserPlaylists[0])

    const dispatch = useDispatch();

    const handleRemoveFavorite = () => {
        dispatch(removeSongFromFavorites(song))
    }

    const handleAddFavorite = () => {
        dispatch(addSong2Favorites(song))
    }

    return ( 
        FavoritePlaylist.songs.includes(song) 
        ? <HeartFilled className="FavoriteGreenIcon" onClick={handleRemoveFavorite}/>
        : <HeartOutlined className="FavoriteGreenIcon" onClick={handleAddFavorite}/>
        
    )
}

export default FavoriteBtn;