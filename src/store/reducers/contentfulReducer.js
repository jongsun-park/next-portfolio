import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space,
  accessToken: accessToken,
});

export const ActionType = {
  FETCH_CONTENTFULT: "fetch_contentful",
  FETCH_CONTENTFULT_SUCCESS: "fetch_contentful_SUCCESS",
  FETCH_CONTENTFULT_ERROR: "fetch_contentful_ERROR",
};

export const fetchContentful = async (dispatch) => {
  dispatch({
    type: ActionType.FETCH_CONTENTFULT,
  });

  try {
    const entries = await client.getEntries();
    dispatch({
      type: ActionType.FETCH_CONTENTFULT_SUCCESS,
      payload: entries.items,
    });
  } catch (err) {
    dispatch({
      type: ActionType.FETCH_CONTENTFULT_ERROR,
      payload: err.message,
    });
  }
};

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default function contentfulReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.FETCH_CONTENTFULT:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionType.FETCH_CONTENTFULT_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case ActionType.FETCH_CONTENTFULT_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
}
