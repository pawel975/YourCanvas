import './CreateNewProjectMenu.css';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { AvailableProjectTypes, setProjectType } from './redux/createNewProjectMenuSlice';

const CreateNewProjectMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleNewProjectButtonClick(e: any) {
    const newProjectOption = e.target as HTMLLIElement;
    setAnchorEl(null);
    dispatch(setProjectType(newProjectOption.id as AvailableProjectTypes));
  }

  return (
    <div>
      <Button
        className="create-new-project-menu"
        aria-controls={open ? 'create-new-project-menu__dropdown' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Create project
      </Button>
      <Menu
        className="create-new-project-menu__dropdown"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'create-new-project-menu__dropdown',
        }}
      >
        <MenuItem
          id="drawing"
          onClick={handleNewProjectButtonClick}
        >
          Drawing
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CreateNewProjectMenu;
