import supabase from "../Supabase/clients"
import { useState, useEffect } from "react"

const Home = () => {
  const [fetchError, setFectchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(()=> {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
        .from('Supa_smoothies')
        .select()

        if(error){
          setFectchError("Could not fetch the smoothies")
          setSmoothies(null)
          console.log(error)
        }

        if (data){
          setSmoothies(data)
          setFectchError(null)
        }
    }
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies &&(
        <div className="smoothies">
          {smoothies.map(smoothie => (
            <p>{smoothie.title}</p>
          ))}
        </div>
      )}
      <h2>Home</h2>
    </div>
  )
}

export default Home