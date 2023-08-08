import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { operationsOnHistoryScheme } from '../../schemeData';
import {
  setIsSnapshotEditingActive,
  updateCurrentSnapshotId,
} from '../snapshotHistory/redux/snapshotHistorySlice';

const UndoStepButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentSnapshotId = useAppSelector((state) => state.snapshotHistory.currentSnapshotId);
  const handleStepButtonClick = () => {
    if (currentSnapshotId && currentSnapshotId > 0) {
      dispatch(updateCurrentSnapshotId(currentSnapshotId - 1));
      dispatch(setIsSnapshotEditingActive(true));
    }
  };

  const undoIcon = operationsOnHistoryScheme.map((operation) => {
    if (operation.id === 'undoStep') return operation.icon;
  });
  return (
    <button
      onClick={handleStepButtonClick}
      className="undo-step-button button-icon"
    >
      {undoIcon}
    </button>
  );
};

export default UndoStepButton;
