import { useState,useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import Button from '../Button';

function Users() {
    const [users, setUsers] = useState();
    const refresh = useRefreshToken()
    
    return (
        <article>
            {/* <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user,i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                )
                : <p> No user to display</p>
            }
            <Button onClick={() => {refresh()}}>btn</Button> */}
        </article>
    );
}   

export default Users;
