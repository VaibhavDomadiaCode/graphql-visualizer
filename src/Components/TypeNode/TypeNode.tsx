import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from '@mui/material';
import { GraphQLObjectType } from 'graphql';
import { Handle, NodeProps, Position } from 'reactflow';

type TypeNodeProps = {
    label: string
    type: GraphQLObjectType
}

type Field = {
    name: string,
    type: string,
    description?: string
}

export default function TypeNode({ data }: NodeProps<TypeNodeProps>) {

    const fields = data.type.getFields();

    const fieldViewsData: Field[] = [];

    for(const field in fields) {
        fieldViewsData.push({
            name: field,
            type: fields[field].type.toString(),
            description: fields[field].description?.toString()
        });
    }

    return (
        <Box sx={{
            color: '#e0e0e0',
            backgroundColor: '#2f2f2f',
            borderRadius: 2,
            border: '4px solid #4287f5'
        }}>
            <Typography variant='h4' color='#ffffff' sx={{
                padding: 2
            }}>
                { data.type.name }
                <Handle type='target' position={Position.Left}/>
            </Typography>

            <List>
                {
                    fieldViewsData.map(fieldViewData => {
                        return (
                            <Tooltip disableInteractive placement='top-start' title={
                                fieldViewData.description &&
                                <Typography variant='body2' color='#ffffff' sx={{
                                    padding: 1
                                }}>
                                    { fieldViewData.description }
                                </Typography>
                            }>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        '&:hover': {
                                            backgroundColor: '#4f4f4f'
                                        }
                                    }}>
                                        <Grid container justifyContent="space-between" gap={2}>
                                            <Grid item>
                                                <ListItemText primary={fieldViewData.name} />
                                            </Grid>
                                            <Grid item>
                                                <ListItemText primary={fieldViewData.type} sx={{color: '#4287f5'}} />
                                            </Grid>
                                        </Grid>
                                    </ListItemButton>

                                    <Handle type='source' position={Position.Right}/>
                                </ListItem>
                            </Tooltip>
                        )
                    })
                }
            </List>
        </Box>
    )
}