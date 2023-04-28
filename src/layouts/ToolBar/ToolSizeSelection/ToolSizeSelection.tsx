import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import toolsSchemeData from '../toolsSchemeData';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setToolSize } from './redux/toolSizeSelectionSlice';
import { useEffect } from 'react';

const ToolSizeSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentToolId = useAppSelector((state) => state.toolSelection.tool);
  const toolSizes = toolsSchemeData.find((tool) => tool.id === currentToolId)?.sizesInPx;

  const toolSizesOptions = toolSizes?.map((size) => (
    <MenuItem
      key={size}
      value={size}
    >
      {size} px
    </MenuItem>
  ));

  function handleSizeOptionChange(e: SelectChangeEvent) {
    const sizeOptionValue = e.target.value as unknown as number;
    dispatch(setToolSize(sizeOptionValue));
  }

  useEffect(() => {
    if (toolSizes) {
      dispatch(setToolSize(toolSizes[0]));
    }
  }, [dispatch, toolSizes]);

  return (
    <FormControl
      variant="outlined"
      fullWidth
    >
      <InputLabel id="tool-size-selection">Tool Size</InputLabel>
      <Select
        labelId="tool-size-selection-label"
        id="tool-size-selection"
        value={toolSizes![0] as unknown as string}
        label="Tool Size"
        onChange={handleSizeOptionChange}
      >
        {toolSizesOptions}
      </Select>
    </FormControl>
  );
};

export default ToolSizeSelection;
