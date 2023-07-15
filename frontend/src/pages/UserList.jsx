import { useEffect, useState } from 'react';
import adminService from '../services/admin-service';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        adminService
            .getAllUsers()
            .then(resp => setUsers(resp.data))
            
    }, []);
    return (
        users.map(user => (
            <>
                <div>
                    <p>{user.id}</p>
                    <p>{user.email}</p>
                </div>
                <hr />
            </>
        ))
    )
}