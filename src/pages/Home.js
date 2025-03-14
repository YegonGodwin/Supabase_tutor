import { supabase } from "../Supabase/clients"; // Verify this path is correct
import { useState, useEffect } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      try {
        const { data, error } = await supabase
          .from('supa_smoothies') // Ensure this matches your exact table name in Supabase
          .select('*'); // Explicitly specify columns or use '*'

        if (error) {
          setFetchError("Could not fetch the smoothies");
          setSmoothies(null);
          console.error("Supabase error:", error.message);
          return;
        }

        if (data) {
          setSmoothies(data);
          setFetchError(null);
          console.log("Fetched data:", data); // For debugging
        }
      } catch (err) {
        setFetchError("An unexpected error occurred");
        console.error("Unexpected error:", err);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies ? (
        <div className="smoothies">
          {smoothies.map((smoothie) => (
            <p key={smoothie.id}>{smoothie.title}</p> // Added key prop
          ))}
        </div>
      ) : (
        !fetchError && <p>Loading...</p> // Optional loading state
      )}
      <h2>Home</h2>
    </div>
  );
};

export default Home;