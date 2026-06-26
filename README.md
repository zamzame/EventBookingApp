# Hands on Project 2
# Event Booking App
A React project for the Hands-On Project assignment of React Course. Users can browse events, book tickets in a 3-step flow, manage their bookings, and toggle light/dark mode.

## Events
1. Added TanStack and staleTime configured to fetch all events 
2. display in a grid
3. Searchbar using useDeferredValue
4. Filters: Category, Date and price range
5. Sort by: date, price 
6. Like/favorite button
## Event Details
1. Show event info, ticket types, and availability
2. "Book Now" button
## Booking Flow
1. 3-step process: Select Ticket -> Attendee Details -> Confirmation
2. useReducer
3. Select Tickets: choosing type and quantity, show total
4. Attendee Info Form with validation
5. Confirmation with Summary 
## MyBookings
2. Added TanStack and staleTime, gcTime configured to fetch my bookings (upcoming, past, canceled)  
3. Loading/error states
4. useMutation
5. Filter button
#


## Core Features 
1. Events Listing & Discovery
    Events Page
    - Display all available events in a card-based layout
    - Each event card must show: title, date, location, price, and category
    - Implement search by event title
    - Implement filters:
    - Category (Technology, Music, Sports, Arts, etc.)
    - Date (Upcoming, This Week, This Month)
    - Price range (Free, Under $50, $50+)
    - Sort events by date or price
    - Show a "favorite/like" icon on each event card
    Event Details Page
    - Display complete event information (description, date, time, location, organizer)
    - Show available ticket types with pricing
    - Hands on project - 1 1
    - Display a "Book Tickets" button

2. Ticket Booking
    Booking Flow
    - Step 1: Select Tickets
        Choose ticket type and quantity
        Show price calculation in real-time
        Display total amount
    - Step 2: Attendee Details
        Form to collect: Name, Email, Phone for each ticket
        Validate all fields
        Show error messages for invalid inputs
    - Step 3: Confirmation 
        -- It's not completed yet, I'm working on it. There are some issues to browser the entire page
        Display booking summary
        Show success message with booking reference number
        Button to view "My Bookings"
    - Requirements:
        Show progress indicator (Step 1 of 3, Step 2 of 3, etc.) 
        Allow going back to previous steps
        Prevent moving forward if current step is invalid

3. My Bookings
    -- not completed yet
    Display list of user's bookings
    Show: Event name, date, number of tickets, total amount, booking status
    Filter by: Upcoming or Past events
    Ability to cancel upcoming bookings
    Hands on project - 1 2
    Show confirmation dialog before cancellation

4. Theme Toggle
    Implement Light and Dark mode
    Theme toggle button in header/navigation
    Theme should apply to entire application
    Theme preference should persist (use browser storage)

- User Experience Requirements
    Loading indicator when fetching data
    Error messages when something goes wrong
    Empty state messages (e.g., "No events found", "No bookings yet")
    Success notification after booking or cancellation
    Responsive design (works on desktop and mobile)

- Navigation:
    Header/navbar with links to: Events, My Bookings, Profile/Theme Toggle
    Clear indication of current page

- Technical Requirements
    React Concepts to Demonstrate:
    Component composition and props
    State management (useState and useReducer for booking flow)
    Effects (useEffect for data fetching)
    Context API (for theme and user state)

Hands on project - 1 3
    Refs (at least one use case - e.g., auto-focus search input)
    Portals (for modals or notifications)
    Conditional rendering
    List rendering with proper keys
    Event handling
    Form handling with validation
    Memo or performance optimization (at least one example)

## Tech Stack
    Language: JavaScript
    Build Tool: Vite
    UI Library: React
    Styling: Plain CSS
    HTTP: fetch

# Recuired Concepts    

**Component composition + props:** EventCard, Stepper
**useState:** filters, search input, login form, quantity controls
**useReducer:** BookingReducer.js
**useEffect:** useEvents, useEvent, ThemeContext, useFavorites
**Context:** ThemeContext, UserContext
**useRef:** EventFilters.jsx
**useMemo:** EventsPage.jsx
**Custom hooks:** useEvents, useEvent, useFavorites, , useTheme, useUser
**Event handling:** onChange, onClick
**Forms with validation:** AttendeeDetails.jsx
------------------------------------------------------------------------------------------------------------------------------------
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

