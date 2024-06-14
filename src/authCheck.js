export const isUserLoggedIn = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
  };