import { useMemo, useState } from "react";
import { useEvents } from "./useEvents.js";
import { useFavorites } from "./useFavorites.js";
import { useDebounce } from "../../hooks/useDebounce.js";
import {
  isUpcoming, isThisWeek, isThisMonth,
} from "../../utils/dates.js";
import EventCard from "./EventCard.jsx";
import EventFilters from "./EventFilters.jsx";

export default function EventsPage() {
  const { events, loading, error } = useEvents();
  const { toggle, isFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const debouncedSearch = useDebounce(search, 200);

  const visibleEvents = useMemo(() => {
    return events
      .filter((e) =>
        e.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .filter((e) => category === "all" || e.category === category)
      .filter((e) => {
        if (dateFilter === "all") return true; // I don't have any filter
        if (dateFilter === "upcoming") return isUpcoming(e.date);
        if (dateFilter === "week") return isThisWeek(e.date);
        if (dateFilter === "month") return isThisMonth(e.date);
        
        return true;

      })
      .filter((e) => {
        const lowest = Math.min(...e.ticketTypes.map((t) => t.price));
        if (priceFilter === "all") return true;
        if (priceFilter === "free") return lowest === 0;
        if (priceFilter === "under50") return lowest > 0 && lowest < 50;
        if (priceFilter === "over50") return lowest >= 50;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date") return new Date(a.date) - new Date(b.date);
        if (sortBy === "price") {
          const pa = Math.min(...a.ticketTypes.map((t) => t.price));
          const pb = Math.min(...b.ticketTypes.map((t) => t.price));
          return pa - pb;
        }
        return 0;
      });
  }, [events, debouncedSearch, category, dateFilter, priceFilter, sortBy]);

  return (
    <div className="page">
      <h1>Events</h1>

      <EventFilters
        search={search} onSearchChange={setSearch}
        category={category} onCategoryChange={setCategory}
        dateFilter={dateFilter} onDateFilterChange={setDateFilter}
        priceFilter={priceFilter} onPriceFilterChange={setPriceFilter}
        sortBy={sortBy} onSortByChange={setSortBy}
      />

      {loading && <p>Loading events...</p>}  {/*loading ===true => Showing Loading message*/}
      {error && <p className="error">Error: {error}</p>} {/*error ===true => Showing error message*/}

      {!loading && !error && visibleEvents.length === 0 && (
        <div className="empty-state">
          <p>No events found.</p>
          <p>Try changing the filters.</p>
        </div>
      )}



      <div className="events-grid">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isFavorite={isFavorite(event.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </div>
    </div>
  );
}