import { Image, Menu } from 'antd';

import type { MenuProps } from 'antd';

import './drawer.css';
import { HomeFilled } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

//import './drawer.css';

const Drawer = () =>{

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
            src="./img/spotify logo.png"
	    width={164}
	    preview={false}    />, "spotify_logo","" , [] , "group"),

getItem(<div><h1>test</h1></div>, '13', <HomeFilled style={{ fontSize: '30px',}} className="side_main_icon"/>), getItem('Option 14', '14')
];	
	const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
return <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['13']}
      mode="inline"
      items={items}
      className="side_menu"
    />
}

export default Drawer;
