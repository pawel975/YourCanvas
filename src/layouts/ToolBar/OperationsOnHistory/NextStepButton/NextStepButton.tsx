import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  setIsSnapshotEditingActive,
  updateCurrentSnapshotId,
} from '../../../../features/snapshotHistory/redux/snapshotHistorySlice';

const NextStepButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const snapshotHistory = useAppSelector((state) => state.snapshotHistory.snapshots);
  const currentSnapshotId = useAppSelector((state) => state.snapshotHistory.currentSnapshotId);
  const handleStepButtonClick = () => {
    if (currentSnapshotId <= snapshotHistory.length) {
      dispatch(setIsSnapshotEditingActive(true));
      dispatch(updateCurrentSnapshotId(currentSnapshotId + 1));
      console.log(currentSnapshotId, 'next');
    }
  };
  return (
    <button
      onClick={handleStepButtonClick}
      className="undo-step-button"
    >
      Next Step
    </button>
  );
};

export default NextStepButton;
