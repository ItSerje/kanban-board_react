import { UPDATE_DASHBOARD_COLUMN_NAME } from '../actions';

const dashboard_reducer = (state, action) => {
  if (action.type === UPDATE_DASHBOARD_COLUMN_NAME) {
    const { columnId, text } = action.payload;
    const newState = { ...state };
    newState.columns[columnId].name = text;
    return { ...newState };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default dashboard_reducer;
