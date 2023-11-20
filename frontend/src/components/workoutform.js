import { useState } from 'react'
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import {useAuthContext} from '../hooks/useAuthContext'


const WorkoutForm = ()=>{
    const { dispatch } =useWorkoutContext()
    const {user} = useAuthContext()


    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [practice,setPractice]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields] = useState([])
  

    const handleSubmit= async (e) => {
        e.preventDefault()

        if(!user)
        {
          setError('You must be logged In')
          return
        }

        const workout = {title,load,practice}

        const response = await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
        }
        if(response.ok)
        {
            setError(null)
            setTitle('')
            setLoad('')
            setPractice('')
            setEmptyFields([])
            console.log('Now workout added',json)
            dispatch({type: 'CREATE_WORKOUT',payload:json})
            window.location.reload()
        }
       

    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Title</h3>
            <label>
                Excersize Title:
            </label>
            <input
              type='text'
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              className={emptyFields.includes('title') ? 'error': ''}
            />
            <label>
                Load (in Kg) :
            </label>
            <input
              type='number'
              onChange={(e)=>{
                setLoad(e.target.value)
              }}
              className={emptyFields.includes('load') ? 'error': ''}
            />
            <label>
                practice:
            </label>
            <input
              type='number'
              onChange={(e)=>{
                setPractice(e.target.value)
              }}
              className={emptyFields.includes('practice') ? 'error': ''}
            
            />



            <button>Add the workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )

}

export default WorkoutForm