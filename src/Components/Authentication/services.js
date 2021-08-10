import { UseAxios } from "../../Utils/UseAxios";
import {
  saveDataToLocalStorage,
  setupAuthHeaderForServiceCalls,
} from "../../Utils/UseAxios";
export const loginUser = async ({
  userDetails,
  dispatch,
  setLoading,
  userDispatch,
}) => {
  try {
    const { success, message, token, user } = await UseAxios(
      "POST",
      `/user/login`,
      userDetails
    );
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
      setLoading(false);
    } else {
      saveDataToLocalStorage(token, user);
      setupAuthHeaderForServiceCalls(token);
      userDispatch({
        type: "SET_LOGIN",
        payload: { user, token },
      });
      setLoading(false);
      return success;
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};

export const signUpUser = async ({ userDetails, dispatch, setLoading }) => {
  try {
    const { success, message } = await UseAxios(
      "POST",
      `/user/signup`,
      userDetails
    );
    setLoading(false);
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
      return success;
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};
