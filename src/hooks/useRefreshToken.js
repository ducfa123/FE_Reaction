import useAuth from './useAuth';
import { baseUrl } from '../helper/constant';
import axios from 'axios';
function useRefreshToken() {
    const { auth, setAuth } = useAuth();
    

    const refresh = async () => {
        const response = await axios.post(
            baseUrl + '/users/refresh',
            {
                refreshToken: auth.refreshToken,
            },
            {
                headers: { Authorization: 'Bearer ' + auth.accessToken },
            },
        );

        return setAuth((prev) => {
            console.log('old at',prev.accessToken)
            console.log('old rt',prev.refreshToken)
            console.log('new access token',response.data.data.refreshToken);
            console.log('new refresh token',response.data.data.accessToken);
            return {
                ...prev,
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken,
            };
        });
    };

    return refresh;
}

export default useRefreshToken;
