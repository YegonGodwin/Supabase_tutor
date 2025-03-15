import { supabase } from "../Supabase/clients";
import { useState, useEffect } from "react";

import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSmoothies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('Supasmooth')
          .select();

        if (error) throw error;
        
        console.log('Fetched data:', data);
        setSmoothies(data);
        setFetchError(null);
      } catch (error) {
        console.error('Fetch error:', error);
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/*order-by-buttons */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;