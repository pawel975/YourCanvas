import "./CreateNewProjectMenu.css";
import * as React from 'react';
import {Button, Menu, MenuItem} from '@mui/material';

const CreateNewProjectMenu: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (e: any) => {
      setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div>
            <Button
                className="create-new-project-menu"
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
        </div>
    );
    }

export default CreateNewProjectMenu;



