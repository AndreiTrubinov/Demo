import { refreshToken } from "../api/auth";

export const tokenStore = (function() {
    var privateToken: string | null = null;
    var waitingCallbacks : Array<(privateToken: string) => void> = [];
    var refreshTokenActive : boolean = false;
    var refreshTokenHasBeenCalled : boolean = false;
    var requireLogin = false;
    var requireLoginLastCallback: any = null;

    function updatePivateToken(token: string) {
      privateToken = token;
      if(privateToken !== null) {
          requireLogin = false;
          while(waitingCallbacks.length > 0) {
            const callback = waitingCallbacks.shift()
            if(typeof callback === 'function') {
                callback(privateToken);
            }
          }
      }
    }
  
    return {
      setToken: function(token: string) : void {
        updatePivateToken(token);
      },
  
      getToken: function() : string | null {
        return privateToken;
      },

      callIfTokenAvaible : function(callback: (token: string) => void) {
        if(privateToken !== null) {
            callback(privateToken);
        }
      },

      callIfTokenNotAvaible : function(callback: () => void) {
        if(privateToken === null) {
            callback();
        }
      },

      callIfRequireLogin : function(callback: () => void) {
        if(requireLogin) {
            callback();
        }
      },

      getRequireLogin: function() : boolean {
        return requireLogin;
      },

      clearToken : function() {
        privateToken = null;
      },

      clearTokenAndRequireLogin : function() {
        privateToken = null;
        requireLogin = true;
        if(typeof requireLoginLastCallback === 'function') {
          requireLoginLastCallback();
          requireLoginLastCallback = null;
        }
      },

      // refreshToken : function() {
      //   if(refreshTokenActive === false){
      //     refreshTokenActive = true;
      //     refreshToken().then(
      //       resp => resp, // success
      //       resp => console.log(`resfresh token rejected resp`, resp)
      //     ).finally(() => refreshTokenActive = false).catch();
      //   }
      // },

      callWhenRequireLoginLastCallOnly: function(callback : () => void) {
          if(requireLogin) {
            callback();
          } else {
            requireLoginLastCallback = callback;
          }
      },

      callWhenTokenAvaible: function(callback : (privateToken : string) => void) {
          if(privateToken === null) {
            waitingCallbacks.push(callback);
            // if(refreshTokenActive === false){
            //   refreshTokenActive = true;
            //   refreshToken().then(
            //     resp => resp, // success
            //     resp => console.log(`resfresh token rejected resp`, resp)
            //   ).finally(() => refreshTokenActive = false).catch();
            // }
          } else {
              callback(privateToken);
          }
      }
    };
  })();