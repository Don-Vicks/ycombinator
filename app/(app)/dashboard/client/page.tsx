"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [first, setFirst] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchE = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }
        const body = await res.json();
        setFirst(body.message); // Assuming image URL is in "message" property
      } catch (error) {
        console.error("Error fetching dog image:", error);
        // Handle error gracefully, e.g., display an error message or fallback image
        setFirst(null); // Or set a placeholder value to avoid rendering issues
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchE();
  }, []); // Empty dependency array to run only on component mount

  return (
    <div>
      {isLoading ? (
        <p>Loading dog image...</p>
      ) : (
        first ? (
          <img src={first} alt="Random Dog" />
        ) : (
          <p>Error fetching dog image</p>
        )
      )}
    </div>
  );
};

export default Page;