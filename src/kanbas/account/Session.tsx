import * as client from "./client"
import React, {useCallback, useEffect, useState} from "react"
import {setCurrentUser} from "./reducer"
import {useDispatch} from "react-redux"

type SessionProps = {
    children: React.ReactNode
}


function Session(props: SessionProps) {
    const [pending, setPending] = useState(true)
    const dispatch = useDispatch()
    const fetchProfile = useCallback(async () => {
        try {
            const currentUser = await client.profile()
            dispatch(setCurrentUser(currentUser))
        } catch (err: any) {
            console.error(err)
        }
        setPending(false)
    }, [dispatch])
    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return (<>
        {pending ? <>Loading</> : <>{props.children}</>}
    </>)
}

export default Session