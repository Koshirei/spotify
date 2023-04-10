import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateSelectPageDrawer, PlaylistInterface } from '../Redux/SpotifySlice';

const Playlist = () => {

	let { id } = useParams();

	const dispatch = useDispatch();
	dispatch(updateSelectPageDrawer("/playlist/"+id));
	
	let playlist = {} as PlaylistInterface;
	
	// obligé de mettre les deux selector car si on veut en appeller que 1 dans le switch case, react ne compile pas 
	const topPlaylists = useSelector((state: any) => state.Spotify.TopPlaylists);
	const userPlaylists = useSelector((state: any) => state.Spotify.UserPlaylists);

	if (id !== undefined ) {
		switch (id.includes("TOP50-")){
			case true: playlist = topPlaylists.filter((topPlaylist: any)=>topPlaylist.id === id)[0]; break;
			case false: playlist = userPlaylists.filter((userPlaylist: any)=>userPlaylist.id === id)[0]; break;
		}
	}

	console.log(playlist);

		
	return playlist === undefined ?<div>undefined </div> : <div>{id}</div>
}

export default Playlist
