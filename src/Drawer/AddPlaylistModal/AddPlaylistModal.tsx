import {useEffect, useState} from 'react';

import { Alert, Button, Input, Modal } from 'antd';

import {useDispatch, useSelector} from 'react-redux';
import {createPlaylist, hideAddPlaylistModal, PlaylistInterface} from '../../Redux/SpotifySlice';

const AddPlaylistModal = () => {

    const dispatch = useDispatch();
    const AddPlaylistModalVisible = useSelector((state: any) => state.Spotify.AddPlaylistModalVisible);

    const UserPlaylists = useSelector((state: any) => state.Spotify.UserPlaylists);
    const TopPlaylists = useSelector((state: any) => state.Spotify.TopPlaylists);

    const [newPlaylistName, setNewPlaylistName] = useState<string>("");
    const [errorEmpty, setErrorEmpty] = useState<boolean>(false);
    const [errorDupeName, setErrorDupeName] = useState<boolean>(false);

    useEffect(()=>{

        newPlaylistName == "" ? setErrorEmpty(true) : setErrorEmpty(false);

        if( UserPlaylists.filter((playlist:PlaylistInterface)=>playlist.name === newPlaylistName).length > 0 || 
            TopPlaylists.filter((playlist:PlaylistInterface)=>playlist.name === newPlaylistName).length > 0 ){
                setErrorDupeName(true);
        } else{
            setErrorDupeName(false);
        }

    }, [newPlaylistName])

    const resetStates = () => {
        setNewPlaylistName("");
        setErrorEmpty(false);
        setErrorDupeName(false);
    }
    const handleOnModalCancel = () => {
        dispatch(hideAddPlaylistModal())
        resetStates()
    }

    const handleInputOnWriting = (e: React.ChangeEvent<HTMLInputElement>) => {
       setNewPlaylistName(e.target.value);
    }

    const handleOnModalOk = () => {

        if (errorEmpty == false && errorDupeName == false){
            console.log(errorEmpty, errorDupeName)
            dispatch(createPlaylist(newPlaylistName));
            handleOnModalCancel();
        }

    }

    return <Modal
        open={AddPlaylistModalVisible}
        onCancel={handleOnModalCancel}
        onOk={handleOnModalOk}
        title={"Add Playlist"}
        footer={[
            <Button 
                shape="round"
                style={{background:"#1DB954"}}
                onClick={handleOnModalOk}
            >Create</Button>
        ]}
    >
        <Input 
            placeholder='Playlist name'
            value={newPlaylistName}
            onChange={handleInputOnWriting}
            status={errorEmpty == true || errorDupeName == true ? "error" : ""}
        />

        <br/><br/>

        {errorEmpty == true ? (
            <Alert 
                message="Empty Field"
                description="Please give a title to your new playlist."
                type="error"
            />
        ) : errorDupeName == true ? (
            <Alert 
                message="Duplicate name"
                description="Please do not use a playlist name already in use."
                type="error"
            />
        ) : <></>}
    </Modal>
}

export default AddPlaylistModal;