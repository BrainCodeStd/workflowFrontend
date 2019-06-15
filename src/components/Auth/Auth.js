/**
 * Created by Shumail Mehmood on 4/12/2019.
 */
/**
 * Created by Shumail Mehmood on 4/10/2019.
 */
import decode from 'jwt-decode';

export default class AuthHelperMethods {

    // Initializing important variables




    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
  

        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    }

    setToken = (idToken) => {
        // Saves user token to localStorage
      
        localStorage.setItem('id_token', idToken)
    }

    getToken = () => {
        // Retrieves the user token from localStorage
      
        return localStorage.getItem('id_token')
    }

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');

    }

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = decode(this.getToken());
       
        return answer;
    }

  
}