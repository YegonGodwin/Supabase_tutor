import React, { useState } from "react";
import { supabase } from "../Supabase/clients"; // Fixed case sensitivity
import { useNavigate } from "react-router-dom";

const Create = () => {
  //navigating the routing
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }
    console.log("Submitting form data:", { title, method, rating: Number(rating) });
    const { data, error } = await supabase.from("Supasmooth").insert([{ title, method, rating: Number(rating) }]);
    console.log("Insertion result:", { data, error });
    if (!error) {
      console.log("Navigating to home page");
      navigate('/')
    } else {
      console.log("Supabase error:", error);
      setFormError(`Failed to create smoothie: ${error.message}`);
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;