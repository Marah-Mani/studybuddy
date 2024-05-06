import React from 'react'
import { Stack, IconButton, Tooltip, Badge } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HandymanIcon from '@mui/icons-material/Handyman';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AddIcon from '@mui/icons-material/Add';
import AddPosts from '../dialogs/AddPosts';


const Marketrightbar = ({ setter,change }) => {
    const [open, setOpen] = React.useState(false);
    const handlePostClick = () => {
        setOpen(open ? false : true);
    }
    return (
        <Stack padding={"0.5rem"} >
            <Stack>
                <IconBtn onClick={() => setter("Books")} title={"Books"} icon={<MenuBookIcon style={{ color: "white" }} />} />
                <IconBtn onClick={() => setter("Tools")} title={"Tools"} icon={<HandymanIcon style={{ color: "white" }} />} />
                <IconBtn onClick={() => setter("Summary")} title={"Summary/Notes"} icon={<ChecklistRtlIcon style={{ color: "white" }} />} />
            </Stack>
            <Stack position={"absolute"} right={16} bottom={5} >
                <IconBtn onClick={handlePostClick} bottom={true} title={"Add Post"} icon={<AddIcon style={{ color: "white" }} />} />
            </Stack>
            <AddPosts open={open} change={change} setOpen={setOpen} handlePostClick={handlePostClick} />
        </Stack>
    )
}

const IconBtn = ({ title, icon, onClick, value ,bottom=false }) => {
    return (
        <Tooltip title={title} style={{marginBottom: bottom ? "1rem" : "2rem" }}>
            <IconButton color="white" size="large" onClick={onClick}>
                {value ? (
                    <Badge badgeContent={value} color="error">
                        {icon}
                    </Badge>
                ) : (
                    icon
                )}
            </IconButton>
        </Tooltip>
    );
};

export default Marketrightbar
