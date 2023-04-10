import FakeControls from './FakeControls';
import FakePlayer from './FakePlayer';
import './Footer.css';
import SongTitle from "./SongTitle";

const Footer = () =>{

    return <footer>
            <SongTitle />
            <FakePlayer />
            <FakeControls />
    </footer>
}

export default Footer;