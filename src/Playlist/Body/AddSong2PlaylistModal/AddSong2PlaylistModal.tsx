import { Button, Modal } from "antd";
import { PlaylistInterface, SongDataInterface, addSongToPlaylist, hideAddSong2PlaylistModal, removeSongFromPlaylist } from "../../../Redux/SpotifySlice"
import { useSelector, useDispatch} from "react-redux";
import './AddSong2PlaylistModal.css'

interface AddSong2PlaylistModalInterface {
    song: SongDataInterface
}

const AddSong2PlaylistModal = ({
    song
}: AddSong2PlaylistModalInterface) => {

    let AddSong2PlaylistModalVisible = useSelector((state:any)=>state.Spotify.AddSong2PlaylistModalVisible)
    let userPlaylists = useSelector((state:any)=>state.Spotify.UserPlaylists)

    const dispatch = useDispatch();

    const handleModalOnCancel = () => {
        dispatch(hideAddSong2PlaylistModal())
    }

    const handleOnClickAddSong = (playlist: PlaylistInterface) => {
        dispatch(addSongToPlaylist([playlist.id, song]))
        handleModalOnCancel()
    }

    const handleOnClickRemoveSong = (playlist: PlaylistInterface) => {
        dispatch(removeSongFromPlaylist([playlist.id, song]))
        handleModalOnCancel()
    }

    return <Modal
        open={AddSong2PlaylistModalVisible}
        title={"Add or remove the song " + song.title + " by " + song.artist + " to any of these playlists :"}
        onCancel={handleModalOnCancel}
        footer={null}
        className="AddSong2PlaylistModal"
    >
        {userPlaylists.map((playlist:PlaylistInterface)=>{
            let alreadyIn = false;

            playlist.songs.forEach((playlistSong)=>{
                if (playlistSong.title === song.title){
                    alreadyIn = true
                }
            })

            return alreadyIn 
            ? <div key={crypto.randomUUID()}>
                <Button
                    className="RemoveFromPlaylistBtn"
                    key={crypto.randomUUID()}
                    onClick={()=>handleOnClickRemoveSong(playlist)}>
                        {playlist.name}
                </Button>
            </div>
            : <div key={crypto.randomUUID()}>
                <Button 
                    className="Add2PlaylistBtn"
                    key={crypto.randomUUID()}
                    onClick={()=>handleOnClickAddSong(playlist)}>
                        {playlist.name}
                    </Button>
            </div>
        })}

    </Modal>
    
}

export default AddSong2PlaylistModal