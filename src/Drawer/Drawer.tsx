import { Button, Image, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { HomeFilled, PlusSquareFilled, HeartFilled} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {showAddPlaylistModal} from '../Redux/SpotifySlice';

import './Drawer.css';

import { PlaylistInterface } from '../Redux/SpotifySlice';
import AddPlayListModal from './AddPlaylistModal';

type MenuItem = Required<MenuProps>['items'][number];

const Drawer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activePage = useSelector((state: any) => state.Spotify.activePage);
  const playlists = useSelector((state: any) => state.Spotify.UserPlaylists);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [

    getItem(<Image
      className="spotify_logo"
      alt="Spotify's logo"
      src="/img/spotify logo.png"
      width={164}
      preview={false} />, "spotify_logo", "", [], "group"),

    getItem(<div>Home</div>, 'home', <HomeFilled style={{ fontSize: '30px' }} />),
    getItem(<div>Add Playlist</div>, 'add_playlist', <PlusSquareFilled style={{ fontSize: '30px', }}/>),

    getItem(
    <div className='displayFlex'>
      <div 
        className='favoriteThumbnail'
        style={{ background: "linear-gradient(0deg, "+ playlists[0].randomHex1 +" 0%, "+ playlists[0].randomHex2 +" 100%)"}}
      >  
        <HeartFilled className='centeredIconDrawer'/>
      </div>
      <span className='marginLeft'>Add Playlist</span>
    </div>, 'playlist/'+playlists[0].id),

  ];

  playlists.forEach((playlist:PlaylistInterface, index:number) => {
    if(index > 0){
      items.push(getItem(
        <div>
          {playlist.name}
        </div>, '/playlist/'+playlist.id
      ))
    }
  })

  const handleMenuOnClick: MenuProps['onClick'] = (e) => {
    e.key === "add_playlist" ? dispatch(showAddPlaylistModal())  : navigate(e.key);
  };

  return <>
    <Menu
      onClick={handleMenuOnClick}
      style={{ width: 301 }}
      mode="inline"
      items={items}
      className="side_menu"
      selectedKeys={[activePage]}
    />
    <AddPlayListModal />
  </>
}

export default Drawer;
