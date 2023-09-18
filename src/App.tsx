import React, { useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';

import logo from './logo.svg';
import './App.css';
import TypeNode from './Components/TypeNode/TypeNode';

import introspectionJSON from './IntrospectionData/schema.json';
import { buildClientSchema, IntrospectionQuery } from 'graphql';

const nodeTypes = {
    typeNode: TypeNode
}

export default function App() {
    const [introspection, setIntrospection] = useState(introspectionJSON);

    const schema = buildClientSchema(introspection as IntrospectionQuery);

    const QueryType = schema.getQueryType();

    const [nodes, setNodes, onNodesChange] = useNodesState([{
        id: '1',
        position: {
            x: 100,
            y: 200
        },
        data: {
            label: '1',
            type: QueryType
        },
        type: 'typeNode'
    }]);
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow nodeTypes={nodeTypes} nodes={nodes} minZoom={0.1}>
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}