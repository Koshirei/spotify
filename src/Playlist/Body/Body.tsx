import { Input, Table } from "antd";
import { PlaylistInterface, SongDataInterface, duration2time, setCurrentPlayingSong, showAddSong2PlaylistModal } from "../../Redux/SpotifySlice";
import { useState, useEffect } from 'react'
import FavoriteBtn from "../../FavoriteBtn";
import { useDispatch } from "react-redux";

import './Body.css';
import AddSong2PlaylistModal from "./AddSong2PlaylistModal";

interface BodyInterface {
    playlist: PlaylistInterface
}

const Body = ({
    playlist
}: BodyInterface) => {

    const [songs, setSongs] = useState<SongDataInterface[]>(playlist.songs)
    const [filter, setFilter] = useState<string>("")
    const [songBeingAdded, setSongBeingAdded] = useState<SongDataInterface>({artist:"", duration:0,genre:"",popularity:0,title:"0",year:0})

    const dispatch = useDispatch();

    const handleUpdateFilter = (event:any) => {
        setFilter(event.target.value)
    }

    useEffect(()=>{
        setSongs(playlist.songs);
    }, [playlist.songs])

    useEffect(()=>{
        if (filter === ""){
            setSongs(playlist.songs)
        }else{
            setSongs(playlist.songs.filter((song)=>{
                return (
                    song.title.toLowerCase().includes(filter.toLowerCase()) ||
                    song.artist.toLowerCase().includes(filter.toLowerCase()) ||
                    song.genre.toLowerCase().includes(filter.toLowerCase()) ||
                    song.year.toString().includes(filter.toLowerCase()) ||
                    song.popularity.toString().includes(filter.toLowerCase()) ||
                    duration2time(song.duration).includes(filter.toLowerCase())
                )
            }))
        }
    }, [filter])

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key"
        },
        {
            title: "",
            dataIndex: "fav",
            key: "fav"
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'ARTIST',
            dataIndex: 'artist',
            key: 'artist'
        },
        {
            title: 'YEAR',
            dataIndex: 'year',
            key: 'year'
        },
        {
            title: 'GENRE',
            dataIndex: 'genre',
            key: 'genre'
        },
        {
            title: 'POPULARITY',
            dataIndex: 'popularity',
            key: 'popularity'
        },
        {
            title: 'DURATION',
            dataIndex: 'duration',
            key: 'duration'
        }
    ]

    const handleUpdateCurrentPlayingSong = (record: any) => {
        dispatch(setCurrentPlayingSong([{
            artist: record.artist,
            duration: record.trueDuration,
            genre: record.genre,
            popularity: record.popularity,
            title: record.title,
            year: record.year
        }, playlist.randomHex1+"|"+playlist.randomHex2]))
    }

    // j'ai pas réussi a faire fonctionner le composant menu de antd alors j'ai utilisé une modale
    const handleShowModal = (event: any, record: any) => {
        event.preventDefault()

        setSongBeingAdded({
            artist: record.artist,
            duration: record.trueDuration,
            genre: record.genre,
            popularity: record.popularity,
            title: record.title,
            year: record.year
        });

        dispatch(showAddSong2PlaylistModal())
    }

    return <div>

        <div className="PlaylistFilterWrapper">
            <Input 
                placeholder="Search for any data" 
                className="PlaylistBodyFilterInput"
                value={filter} 
                onChange={handleUpdateFilter}/>
        </div>
        
        <Table 
            dataSource={
                songs.map((song, index)=>{
                    return {
                        key: index+1,
                        fav: <FavoriteBtn song={song} />,
                        title: song.title,
                        artist: song.artist,
                        year: song.year,
                        genre: song.genre,
                        popularity: song.popularity,
                        duration: duration2time(song.duration),
                        trueDuration: song.duration
                    }
                })
            }
            columns={columns}
            pagination={false}
            onRow={(record, rowIndex)=>{
                return {
                    onClick: (event => {handleUpdateCurrentPlayingSong(record)}),
                    onContextMenu: (event)=>{handleShowModal(event, record)}
                }
            }}
        />

    <AddSong2PlaylistModal key={crypto.randomUUID()} song={songBeingAdded} />
    </div>
}

export default Body