import { useMemo, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";  
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch } from "../../api/client.js";
import { formatPrice } from "../../utils/currency.js";

export default function MyBookingsPage() {
  const [filter, setFilter] = useState("upcoming");
  const queryClient = useQueryClient();  
  const {user} = useUser();
  
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", user.id],
    queryFn: () => apiGet(`/bookings?userId=${user.id}`),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });  

  const cancelBooking = useMutation({
    mutationFn: (bookingId) =>
      apiPatch(`/bookings/${bookingId}`, { status: "cancelled" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", user.id] });
    },
  });  

  const visibleBookings = useMemo(() => {
    const today = new Date();

    return bookings.filter((booking)=> {
      if (filter === "cancelled"){
        return booking.status === "cancelled";
      }

      const eventDate = new Date(booking.eventDate);

      if (filter === "past"){
        return eventDate < today;  
      }

      return eventDate >= today;
    });

  }, [bookings, filter]);
  return (
    <div className="page">
      <h1>My Bookings</h1>
      {/* <p>My bookings are coming here soon :)</p> */}

      <div className="filtre-row">
        <button className={filter === "upcoming" ? "btn-primary" : "btn-secondary"} onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>

        <button className={filter === "past" ? "btn-primary" : "btn-secondary"} onClick={() => setFilter("past")}>
          Past
        </button>

        <button className={filter === "cancelled" ? "btn-primary" : "btn-secondary"} onClick={() => setFilter("cancelled")}>
          Cancelled
        </button>        
      </div>

      {isLoading && <p>Loading bookings</p>}
      {error && <p className="error">Error:{error.message}</p>}

      {!isLoading && !error && visibleBookings.length === 0 && (<p>No Bookings Found!</p>)}

      <div className="booking-list">
        {visibleBookings.map((booking) => (
          <div className="booking-card" key={booking.id}>

            <h2>{booking.eventTitle}</h2>
            <p>Date: {booking.eventDate}</p>
            <p>Status: {booking.status}</p>
            <p>Reference: {booking.referenceNumber}</p>

            <ul>
              {booking.tickets.map((ticket, index) => (
                <li key={index}>
                  {ticket.quantity} {ticket.type}
                </li>
              ))}
            </ul>

            <p>Total: {formatPrice(booking.totalAmount)}</p>

            {booking.status !== "cancelled" && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => cancelBooking.mutate(booking.id)}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}           
      </div>
    </div>
  );
}