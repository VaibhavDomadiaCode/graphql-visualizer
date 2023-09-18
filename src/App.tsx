import React, { useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Panel, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';

import logo from './logo.svg';
import './App.css';
import TypeNode from './Components/TypeNode/TypeNode';

import { buildClientSchema, GraphQLSchema, IntrospectionQuery } from 'graphql';
import PanelBar from './Components/PanelBar/PanelBar';

const nodeTypes = {
    typeNode: TypeNode
}

export default function App() {
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);

    const updateSchema = (introspectionText: string) => {
        const introspectionJSON = JSON.parse(introspectionText);
        const newSchema = buildClientSchema(introspectionJSON as IntrospectionQuery);
        setSchema(newSchema);

        setNodes([
            {
                id: '1',
                position: {
                    x: 100,
                    y: 200
                },
                data: {
                    label: '1',
                    type: newSchema.getQueryType()
                },
                type: 'typeNode'
            }
        ]);
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow nodeTypes={nodeTypes} nodes={nodes} minZoom={0.1}>
                <Panel position='top-right'>
                    <PanelBar updateSchema={updateSchema}/>
                </Panel>
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}