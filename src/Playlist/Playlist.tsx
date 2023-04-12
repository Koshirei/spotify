import { useParams } from "react-router-dom";
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateSelectPageDrawer, PlaylistInterface } from '../Redux/SpotifySlice';
import Header from "./Header";
import Body from "./Body";

const Playlist = () => {

	let { id } = useParams();

	const dispatch = useDispatch();
	
	useEffect(()=>{
		dispatch(updateSelectPageDrawer("/playlist/"+id));
	}, [])
	
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
		
	return (
		playlist === undefined 
		? <div>
			Playlist ID does not exist 
		</div> 
		: <div>
			<Header playlist={playlist} />
			<Body playlist={playlist} />
		</div>)
}

export default Playlist
