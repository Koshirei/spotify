import { useDispatch } from 'react-redux';

import './Homepage.css';

import Your_playlists from './Your_playlists';
import Top_50 from './Top_50';
import { updateSelectPageDrawer } from '../Redux/SpotifySlice';

const Homepage = () => {

    const dispatch = useDispatch();
    dispatch(updateSelectPageDrawer("home"))

    return <div className="content">
        <Your_playlists />
        <span className='spacerHomepage'/>
        <Top_50 />
    </div>
}

export default Homepage;