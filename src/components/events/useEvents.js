//A custome hook to fetch events
import { useRef, useEffect, useState } from "react";
import { fetchEvents } from "../../api/events.js";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    // let cancelled = false;
    cancelRef.current =false;

    fetchEvents()
      .then((data) => {
        // if (!cancelled) setEvents(data);
        if(!cancelRef.current) setEvents(data);
      })
      .catch((err) => {
        // if (!cancelled) setError(err.message);
        if (!cancelRef.current) setError(err.message);
      })
      .finally(() => {
        // if (!cancelled) setLoading(false);
        if (!cancelRef.current) setLoading(false);

      });

    return () => {
    //   cancelled = true;
        cancelRef.current = true;
    };
  }, []);

  return { events, loading, error };
}