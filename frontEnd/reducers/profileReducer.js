import { FETCH_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from '../actions/profileActions';

const initialState = {
  id_usuario: '',
  nome: '',
  email: '',
  avatar: ''
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return { ...state, ...action.payload };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
