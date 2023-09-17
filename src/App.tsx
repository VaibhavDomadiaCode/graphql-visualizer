import React from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';

import 'reactflow/dist/style.css';

import logo from './logo.svg';
import './App.css';

export default function App() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow>
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} style={{backgroundColor: "#202020"}}/>
            </ReactFlow>
        </div>
    )
}