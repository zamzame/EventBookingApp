//A custome hook to fetch events

// // import { useRef, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../api/events.js";

export function useEvents() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });

  return {
    events: data,
    loading: isLoading,
    error: error?.message,
  };
}



// export function useEvents() {
//   // const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);
//   // const cancelRef = useRef(false);

//   const {
//     data = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["events"],
//     queryFn: fetchEvents,
//     staleTime: 1000 * 60 * 5,
//   });  

//   useEffect(() => {
//     cancelRef.current =false;

//     fetchEvents()
//       .then((data) => {
//         if(!cancelRef.current) setEvents(data);
//       })
//       .catch((err) => {
//         if (!cancelRef.current) setError(err.message);
//       })
//       .finally(() => {
//         if (!cancelRef.current) setLoading(false);
//       });

//     return () => {
//         cancelRef.current = true;
//     };
//   }, []);

//   return { events, loading, error };
// }