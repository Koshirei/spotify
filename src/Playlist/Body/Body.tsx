import { Table } from "antd";
import { PlaylistInterface, SongDataInterface, duration2time } from "../../Redux/SpotifySlice";
import { useState } from 'react'

interface BodyInterface {
    playlist: PlaylistInterface
}

const Body = ({
    playlist
}: BodyInterface) => {

    const [songs, setSongs] = useState<SongDataInterface[]>(playlist.songs)

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key"
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title'
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

    return <div>
        
        <Table 
            dataSource={
                songs.map((song, index)=>{
                    return {
                        key: index+1,
                        title: song.title,
                        year: song.year,
                        genre: song.genre,
                        popularity: song.popularity,
                        duration: duration2time(song.duration)
                    }
                })
            }
            columns={columns}
            pagination={false}
            onRow={(record, rowIndex)=>{
                return {
                    onClick: (event)=>{console.log("onclick ", event, record, rowIndex)},
                    onContextMenu: (event)=>{console.log("oncontextmenu ", event, record, rowIndex)}
                }
            }}
        />
    </div>
}

export default Body