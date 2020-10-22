import { handleActions } from 'redux-actions';

export default handleActions(
  {
    FETCH_PROJECTLIST_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLIST_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLIST_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    FETCH_PROJECTLISTCONDITION_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLISTCONDITION_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLISTCONDITION_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    CREATE_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_PROJECT_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    FETCH_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECT_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECT_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    UPDATE_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_PROJECT_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    LIKE_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    LIKE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    LIKE_PROJECT_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    //MAY BE THERE WILL BE A DISLIKE
    DELETE_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_PROJECT_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    CREATE_CONTRIBUTOR_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_CONTRIBUTOR_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_CONTRIBUTOR_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    DELETE_CONTRIBUTOR_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_CONTRIBUTOR_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_CONTRIBUTOR_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    CREATE_PROCESS_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_PROCESS_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_PROCESS_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    UPDATE_PROCESS_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_PROCESS_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_PROCESS_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    DELETE_PROCESS_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_PROCESS_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_PROCESS_FAILURE: (state) => ({
      ...state,
      isUpdating: true,
      error: action.payload.error,
    }),
    CREATE_NODE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_NODE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_NODE_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    UPDATE_NODE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_NODE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: true,
      error: action.payload.error,
    }),
    DELETE_NODE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_NODE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: true,
      error: action.payload.error,
    }),
    FINISH_NODE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FINISH_NODE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FINISH_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_TIMELINE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_TIMELINE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    CREATE_TIMELINE_FAILURE: (state) => ({
      ...state,
      isFetching: true,
      error: action.payload.error,
    }),
    UPDATE_TIMELINE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_TIMELINE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    UPDATE_TIMELINE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_TIMELINE_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_TIMELINE_SUCCESS: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    DELETE_TIMELINE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
  },
  {
    isFetching: false,
    isUpdating: false,
    isCreating: false,
    projects: [],
    project: {},
    process: [],
    timeline: [],
    contributor: [],
    error: null,
  }
);
