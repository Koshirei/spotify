import { createSlice } from '@reduxjs/toolkit';
var randomHex = require('random-hex');
const data = require('../static/data.json');

export interface SongDataInterface{
	title: string,
	artist: string,
	genre: string,
	year: number,
	duration: number,
	popularity: number
}
export interface PlaylistInterface {
	id: string;
	name: string;
    randomHex1: string;
    randomHex2: string;
	songs: SongDataInterface[]
}

export interface currentSongInterface{
	song: SongDataInterface,
	length: string, // on va convertir song.duration en string m:s
	album: string, // id de playlist pour récuperer la couverture
}

export const duration2time = (duration:number) => {
	const minutes = (Math.floor(duration / 60));
	let secondes = (duration - minutes * 60);

	return minutes + ":" + (secondes < 10 ? "0" + secondes : secondes)
}

const createEmptyPlaylist = (name: string) => {
	const playlist : PlaylistInterface = {
		id: crypto.randomUUID(),
		name: name,	
		randomHex1: randomHex.generate(),
		randomHex2: randomHex.generate(),
		songs: []
	}
	return playlist
}

const initTopPlaylists = () => {
	const playlist: PlaylistInterface[] = [];

	const years = [];

	for (let i = 2019; i>=2010; i--){
		years.push(i)
	}

	years.forEach((year)=>{
		playlist.push({
			id: "TOP50-"+crypto.randomUUID(),
			name: year.toString(),
			randomHex1: randomHex.generate(),
			randomHex2: randomHex.generate(),
			songs: data.filter((song: SongDataInterface)=>song.year === year)
		})
	})

	return playlist;
}

export const SpotifySlice = createSlice({
	name: 'SpotifySlice',
	initialState: {
        UserPlaylists: [createEmptyPlaylist("Liked Songs")] as PlaylistInterface[],
		TopPlaylists: initTopPlaylists() as PlaylistInterface[],
		AddPlaylistModalVisible: false,
		activePage: "",
		currentSong : {album: "", length: "2:00", song: {title:"Select", artist:"A song", duration:0, genre:"", popularity:0, year: 0}} as currentSongInterface
	},
	reducers: {
		createPlaylist: (state: { UserPlaylists: PlaylistInterface[]}, action: {payload: string})=>{
			state.UserPlaylists.push(createEmptyPlaylist(action.payload))
		},
		showAddPlaylistModal: (state: {AddPlaylistModalVisible: boolean})=>{
			state.AddPlaylistModalVisible = true;
		},
		hideAddPlaylistModal: (state: {AddPlaylistModalVisible: boolean})=>{
			state.AddPlaylistModalVisible = false;
		},
		updateSelectPageDrawer:(state: {activePage:string}, action: {payload:string})=>{
			state.activePage = action.payload;
		},
		addSong2Favorites:(state: {UserPlaylists: PlaylistInterface[]}, action: {payload: SongDataInterface})=>{
			state.UserPlaylists[0].songs.push(action.payload);
		},
		removeSongFromFavorites:(state: {UserPlaylists: PlaylistInterface[]}, action: {payload: SongDataInterface})=>{			
			state.UserPlaylists[0].songs = state.UserPlaylists[0].songs.filter((song)=>{
				return song.title !== action.payload.title
			})
		},
		setCurrentPlayingSong:(state: {currentSong: currentSongInterface}, action: {payload:[SongDataInterface, string]})=> {
			let song = action.payload[0]
			state.currentSong = {
				length: duration2time(song.duration),
				song:song,
				album: action.payload[1]
			}
		}
	},
});

export const {
	createPlaylist,
	showAddPlaylistModal,
	hideAddPlaylistModal,
	updateSelectPageDrawer,
	addSong2Favorites,
	removeSongFromFavorites,
	setCurrentPlayingSong
} = SpotifySlice.actions;

export default SpotifySlice.reducer;
