import React, { createContext, useState, useEffect } from "react";

export const ShowContext = createContext();

export const ShowProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [AllShows, setAllShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        setShows(data);
        setAllShows(data); // Store the entire data as AllShows
      } catch (error) {
        throw new Error(
          "Got some error while fetching data with API-- " + error.message
        );
      }
    };

    fetchShows();
  }, []);

  return (
    <ShowContext.Provider value={{ shows, AllShows }}>
      {children}
    </ShowContext.Provider>
  );
};
