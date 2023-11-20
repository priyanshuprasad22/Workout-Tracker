import { useEffect } from 'react'
import WorkoutDetails from '../components/workjoutdetail'
import WorkoutForm from '../components/workoutform'
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'

const Home = ()=>{

    const {workouts,dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            const response = await fetch('/api/workouts',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json= await response.json()

            if(response.ok)
            {
               dispatch({type:'SET_WORKOUTS',payload:json})
            }
        }
        if(user)
        {
            fetchWorkouts()
        }
    },[dispatch,user])

    // dispatch call workout reducer function which gets the action passed as
    // {type:'SET_WORKOUT',payload:json}
    // Now the use of global context instead of local state



    return (
        <div className="home">
            <div className="workouts">
                {workouts && Array.isArray(workouts) && workouts.map((workout) => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home