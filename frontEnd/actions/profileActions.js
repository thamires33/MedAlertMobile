import axios from 'axios';

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

export const fetchProfile = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://seu-backend.com/api/perfil/${userId}`);
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  try {
    const response = await axios.put('https://seu-backend.com/api/perfil', profileData);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
  }
};
