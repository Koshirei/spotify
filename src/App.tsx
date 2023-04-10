import './index.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import {ConfigProvider, theme } from 'antd';

import Drawer from './Drawer';
import Homepage from './Homepage';
import Playlist from './Playlist';

import store from './Redux/SpotifyStore';
import Footer from './Footer';

const {darkAlgorithm} = theme;
const App = () => (
    <div className="app">
        <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'></link>
        <ConfigProvider
            theme={
                {
                    algorithm: darkAlgorithm,
                    token:{
                        colorPrimary: 'white'
                    }
                }
            }
        >
            <Provider store={store}>
                <span className="flexbox_wrapper">
                    <Drawer />
                    <span className='maxHeight'>
                        <Routes>
                            <Route path="/home" element={<Homepage />} />
			                <Route path="/playlist/:id" element={<Playlist />} />
                            <Route path="*" element={<Navigate to="/home" />} />
                        </Routes>
                    </span>
                </span>
                <Footer />
            </Provider>
        </ConfigProvider>
    </div>
);

export default App;
