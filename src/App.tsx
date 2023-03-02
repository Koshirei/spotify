// import React from 'react';
import './index.css';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {ConfigProvider, theme } from 'antd';
import Drawer from './Drawer';
import Homepage from './Homepage';
// import TodoListBasic from './TodoListBasic';
// import TodoListEdit from './TodoListEdit';
// import TodoListWithDesign from './TodoListWithDesign';
// import TodoListRedux from './TodoListRedux';
// import Example from './Example';

const {darkAlgorithm} = theme;
const App = () => (
    <div className="app">
	<ConfigProvider
		theme={{algorithm: darkAlgorithm}}
	>
        <span className="flexbox_wrapper">
            <Drawer />
            <Routes>
                <Route path="/home" element={<Homepage />} />
                {/* <Route path="/todo-list-basic" element={<TodoListBasic />} /> */}
                {/* <Route path="/todo-list-with-design" element={<TodoListWithDesign />} /> */}
                {/* <Route path="/todo-list-edit" element={<TodoListEdit />} /> */}
                {/* <Route path="/todo-list-redux" element={<TodoListRedux />} /> */}
                    {/* <Route path="/example" element={<Example />} /> */}
                <Route path="*" element={<Navigate to="/home
                " />} />
            </Routes>
        </span>
	</ConfigProvider>
    </div>
);

export default App;
