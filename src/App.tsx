import './index.css';

import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import {ConfigProvider, theme } from 'antd';
import Drawer from './Drawer';
import Homepage from './Homepage';
import store from './Redux/SpotifyStore';
import Footer from './Footer';


const {darkAlgorithm} = theme;
const App = () => (
    <div className="app">
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
                            <Route path="/test" element={<Homepage />} />
                        </Routes>
                    </span>
                </span>
                <Footer />
            </Provider>
        </ConfigProvider>
    </div>
);

export default App;
