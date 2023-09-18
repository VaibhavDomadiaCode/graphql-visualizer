import { CloudUpload } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import React from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type PanelBarProps = {
    updateSchema: (introspectionText: string) => void;
}

export default function PanelBar({ updateSchema }: PanelBarProps) {

    const onSchemaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();

        fileReader.onload = async (fileReadEvent) => {
            if(fileReadEvent.target?.result) {
                const introspectionText = fileReadEvent.target.result.toString();
                updateSchema(introspectionText);
            }
        }

        if(event.target.files) {
            fileReader.readAsText(event.target.files[0]);
        }
    }

    return (
        <Box>
            <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                Upload Schema
                <VisuallyHiddenInput type="file" onChange={onSchemaUpload} />
            </Button>
        </Box>
    )
}