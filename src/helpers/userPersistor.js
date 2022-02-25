const USER_KEY = 'user';

export const userPersistor = {
    setAuthUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    user: () => {
        return JSON.parse(localStorage.getItem(USER_KEY));
    },

    accessToken: () => {
        return this.user().accessToken;
    },

    refreshToken: () => {
        return this.user().refreshToken;
    },

    removeUser: () => {
        localStorage.removeItem(USER_KEY);
    },
};
