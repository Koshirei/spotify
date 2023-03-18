import { createSlice } from '@reduxjs/toolkit';
var randomHex = require('random-hex');
const data = require('../static/data.json');
// import '../static/data.json' as static_data

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

	for (let i = 2010; i<=2019; i++){
		years.push(i)
	}

	years.forEach((year)=>{
		playlist.push({
			id: "top-50-"+year.toString(),
			name: "top 50 - " + year.toString(),
			randomHex1: randomHex.generate(),
			randomHex2: randomHex.generate(),
			songs: data.filter((song: SongDataInterface)=>song.year == year)
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
		activePage: ""
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
		}
	},
});

export const {
	createPlaylist,
	showAddPlaylistModal,
	hideAddPlaylistModal,
	updateSelectPageDrawer
} = SpotifySlice.actions;

export default SpotifySlice.reducer;
