import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();
  return (
    <div className="page">
      <h1>Booking</h1>
      <p>Booking for event id: {id}</p>
    </div>
  );
}