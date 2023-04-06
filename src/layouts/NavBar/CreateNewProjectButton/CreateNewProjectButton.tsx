import "./CreateNewProjectButton.css";
import * as React from 'react';
import {Button, Menu, MenuItem} from '@mui/material';

const CreateNewProjectButton: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (e: any) => {
      setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <>
            <Button
                //Used ID instead className, because className doesn't override default MUI styles
                id="create-new-project-button"
                aria-controls={open ? 'create-new-project-button__menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Create project
            </Button>
            <Menu
                className="create-new-project-button__menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'create-new-project-button-menu',
                }}
            >
                <MenuItem onClick={handleClose}>New project</MenuItem>
            </Menu>
        </>
    );
    }

export default CreateNewProjectButton;



