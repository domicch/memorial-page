import firebase from 'firebase';
import * as actionTypes from './actionTypes';
import { app } from "../../base";

export const loginSuccess = (authProvider, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        authProvider: authProvider,
        userId: userId
    };
};

export const loginFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        error: error
    };
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
}

const getGoogleProvider = () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    // provider.setCustomParameters({
    //     'login_hint': 'user@example.com'
    // });

    return provider;
}

export const googleLogin = () => {
    return dispatch => {
        dispatch(loginStart());

        firebase.auth()
            .signInWithPopup(getGoogleProvider())
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                const credential = result.credential;

                dispatch(loginSuccess('google.com', result.user.uid));
            }).catch((error) => {
                dispatch(loginFailed(error));
            });
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
};

export const logoutFailed = (error) => {
    return {
        type: actionTypes.LOGOUT_FAILED,
        error: error
    };
};

export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    };
}

export const logout = () => {
    return dispatch => {
        dispatch(logoutStart());

        firebase.auth().signOut()
            .then((result) => {
                dispatch(logoutSuccess());
            }).catch((error) => {
                dispatch(logoutFailed(error));
            });
    }
}

export const initAuth = () => {
    return dispatch => {
        // set firebase user token persistent to local storage
        app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                console.log('set firebase persistence success');
            })
            .catch((error) => {
                console.log('set firebase persistence failed', error);
            })
            .finally(() => {
                app.auth().onAuthStateChanged(function(user) {
                    console.log('onAuthStateChanged', user);
                    dispatch(refreshLoginState());
                  });
            });
    }
}

export const refreshLoginState = () => {
    return dispatch => {
        const user = app.auth().currentUser;

        if (user === null) {
            dispatch(logout());
            console.log('refreshLoginState user = null');
        } else {
            console.log('refreshLoginState user = '+user.uid);
            dispatch(loginSuccess('google.com', user.uid));
        }
    }
}