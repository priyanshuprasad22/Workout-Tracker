import {useAuthContext} from './useAuthContext'
import {useWorkoutContext} from './useWorkoutContext'

export const useLogOut= () => {

    const { dispatch }= useAuthContext()
    const { dispatch: workoutDispatch} = useWorkoutContext()

    const logout = () =>{
        // remove user from storage
        localStorage.removeItem('user')


        // dispatch logout user
        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUTS',payload: null})

    }

    return {logout}



}