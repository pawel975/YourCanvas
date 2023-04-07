import "./CreateNewProjectMenu.css";
import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface CreateNewProjectButtonProps {
  createNewProject: Function;
}

const CreateNewProjectMenu: React.FC<CreateNewProjectButtonProps> = ({
  createNewProject,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleNewProjectButtonClick() {
    setAnchorEl(null);
    createNewProject();
  }

  return (
    <div>
      <Button
        className="create-new-project-menu"
        aria-controls={open ? "create-new-project-menu__dropdown" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
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
          "aria-labelledby": "create-new-project-menu__dropdown",
        }}
      >
        <MenuItem onClick={handleNewProjectButtonClick}>New project</MenuItem>
      </Menu>
    </div>
  );
};

export default CreateNewProjectMenu;
