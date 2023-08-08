import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  setIsSnapshotEditingActive,
  updateCurrentSnapshotId,
} from '../snapshotHistory/redux/snapshotHistorySlice';
import { operationsOnHistoryScheme } from '../../schemeData';

const RedoStepButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const snapshotHistory = useAppSelector((state) => state.snapshotHistory.snapshots);
  const currentSnapshotId = useAppSelector((state) => state.snapshotHistory.currentSnapshotId);
  const handleStepButtonClick = () => {
    if (currentSnapshotId < snapshotHistory.length - 1) {
      dispatch(setIsSnapshotEditingActive(true));
      dispatch(updateCurrentSnapshotId(currentSnapshotId + 1));
    }
  };

  const redoIcon = operationsOnHistoryScheme.map((operation) => {
    if (operation.id === 'redoStep') return operation.icon;
  });
  return (
    <button
      onClick={handleStepButtonClick}
      className="undo-step-button button-icon"
    >
      {redoIcon}
    </button>
  );
};

export default RedoStepButton;
