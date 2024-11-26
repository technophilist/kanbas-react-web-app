import {Link, useNavigate} from "react-router-dom"
import {setCurrentUser, User} from "./reducer"
import {RootState} from "../store"
import {useDispatch, useSelector} from "react-redux"
import {useCallback, useEffect, useState} from "react"
import * as client from "./client"


function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    const [profile, setProfile] = useState<User | null>(currentUser)
    const updateProfile = useCallback(async () => {
        if (!profile) return
        const updatedProfile = await client.updateUser(profile)
        dispatch(setCurrentUser(updatedProfile))
    }, [dispatch, profile])

    const fetchProfile = useCallback(() => {
        if (!currentUser) return navigate("/kanbas/account/signin")
        setProfile(currentUser)
    }, [currentUser, navigate])

    const signout = useCallback(async () => {
        await client.signout()
        dispatch(setCurrentUser(null))
        navigate("/kanbas/account/signin")
    }, [dispatch, navigate])

    useEffect(() => fetchProfile(), [fetchProfile])

    return (
        <div id="wd-profile-screen row">
            <h3>Profile</h3>
            {profile && (
                <>
                    <label htmlFor="wd-username">Username</label>
                    <input defaultValue={profile.username}
                           id="wd-username"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, username: e.target.value})}/>
                    <label htmlFor="wd-password">Password</label>
                    <input defaultValue={profile.password}
                           id="wd-password"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, password: e.target.value})}/>
                    <label htmlFor="wd-firstname">First Name</label>
                    <input defaultValue={profile.firstName}
                           id="wd-firstname"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, firstName: e.target.value})}/>
                    <label htmlFor="wd-lastname">Last Name</label>
                    <input defaultValue={profile.lastName}
                           id="wd-lastname"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, lastName: e.target.value})}/>
                    <label htmlFor="wd-dob">Date of Birth</label>
                    <input defaultValue={profile.dob}
                           id="wd-dob"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, dob: e.target.value})}
                           type="date"/>
                    <label htmlFor="wd-email">Email</label>
                    <input defaultValue={profile.email}
                           id="wd-email"
                           className="form-control mb-2"
                           onChange={(e) => setProfile({...profile, email: e.target.value})}/>
                    <label htmlFor="wd-role">Role</label>
                    <select id="wd-role"
                            value={currentUser?.role}
                            onChange={(e) => setProfile({...profile, role: e.target.value})}
                            className="form-select mt-2">
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select><br/>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update</button>
                    <button onClick={signout}
                            className="btn btn-danger w-100 mb-2"
                            id="wd-signout-btn">
                        Sign out
                    </button>
                </>
            )}
        </div>
    )
}

export default Profile