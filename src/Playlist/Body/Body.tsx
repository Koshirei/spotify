import { Table } from "antd";
import { PlaylistInterface, SongDataInterface, duration2time, setCurrentPlayingSong } from "../../Redux/SpotifySlice";
import { useState, useEffect } from 'react'
import FavoriteBtn from "../../FavoriteBtn";
import { useDispatch } from "react-redux";

interface BodyInterface {
    playlist: PlaylistInterface
}

const Body = ({
    playlist
}: BodyInterface) => {

    const [songs, setSongs] = useState<SongDataInterface[]>(playlist.songs)
    const dispatch = useDispatch();

    useEffect(()=>{
        setSongs(playlist.songs)
    }, [playlist.songs])

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

    return <div>
        
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
                    onContextMenu: (event)=>{}
                }
            }}
        />
    </div>
}

export default Body