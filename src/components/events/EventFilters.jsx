import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

export default function EventFilters({
  search, onSearchChange,
  category, onCategoryChange,
  dateFilter, onDateFilterChange,
  priceFilter, onPriceFilterChange,
  sortBy, onSortByChange,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="filters">
      <div className="search-box">
        <Search size={18} />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All categories</option>
        <option value="Technology">Technology</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Arts">Arts</option>
      </select>

      <select value={dateFilter} onChange={(e) => onDateFilterChange(e.target.value)}>
        <option value="all">All dates</option>
        <option value="upcoming">Upcoming</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
      </select>

      <select value={priceFilter} onChange={(e) => onPriceFilterChange(e.target.value)}>
        <option value="all">All prices</option>
        <option value="free">Free</option>
        <option value="under50">Under $50</option>
        <option value="over50">$50 and up</option>
      </select>

      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
        <option value="date">Sort: Date</option>
        <option value="price">Sort: Price</option>
      </select>
    </div>
  );
}