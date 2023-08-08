import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  setIsSnapshotEditingActive,
  updateCurrentSnapshotId,
} from '../../../../features/snapshotHistory/redux/snapshotHistorySlice';

const UndoStepButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSnapshotId = useAppSelector((state) => state.snapshotHistory.currentSnapshotId);
  const handleStepButtonClick = () => {
    if (currentSnapshotId && currentSnapshotId > 0) {
      dispatch(setIsSnapshotEditingActive(true));
      dispatch(updateCurrentSnapshotId(currentSnapshotId - 1));
    }
    console.log(currentSnapshotId, 'undo');
  };
  return (
    <button
      onClick={handleStepButtonClick}
      className="undo-step-button"
    >
      Undo Step
    </button>
  );
};

export default UndoStepButton;
