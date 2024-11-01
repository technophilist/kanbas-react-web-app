import {Link, useNavigate} from "react-router-dom";
import {setCurrentUser, User} from "./reducer";
import {RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";


function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector((state: RootState) => state.accountReducer);

    const [profile, setProfile] = useState<User | null>(currentUser);

    const fetchProfile = useCallback(() => {
        if (!currentUser) return navigate("/kanbas/account/signin");
        setProfile(currentUser);
    }, [currentUser, navigate]);

    const signout = useCallback(() => {
        dispatch(setCurrentUser(null));
        navigate("/kanbas/account/signin");
    }, [dispatch, navigate])

    useEffect(() => fetchProfile(), [fetchProfile]);

    return (
        <div id="wd-profile-screen row">
            <h3>Profile</h3>
            {profile && (
                <>
                    <input defaultValue={profile.username}
                           id="wd-username"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, username: e.target.value})}/>
                    <input defaultValue={profile.password}
                           id="wd-password"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, password: e.target.value})}/>
                    <input defaultValue={profile.firstName}
                           id="wd-firstname"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, firstName: e.target.value})}/>
                    <input defaultValue={profile.lastName}
                           id="wd-lastname"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, lastName: e.target.value})}/>
                    <input defaultValue={profile.dob}
                           id="wd-dob"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, dob: e.target.value})}
                           type="date"/>
                    <input defaultValue={profile.email}
                           id="wd-email"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, email: e.target.value})}/>
                    <select id="wd-role"
                            value={currentUser?.role}
                            onChange={(e) => setProfile({...profile, role: e.target.value})}
                            className="form-select mt-2">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select><br/>
                    <button onClick={signout}
                            className="btn btn-danger w-100 mb-2"
                            id="wd-signout-btn">
                        Sign out
                    </button>
                </>
            )}
        </div>
    );
}

export default Profile