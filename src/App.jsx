// import {ThemeProvider} from './context/ThemeContext.jsx';
// import LoginPage from './components/login/loginPage';
// import "./styles/theme.css";
// import "./styles/styles.css";

// function App() {
//   return (
//     <ThemeProvider>
//       <LoginPage/>
//     </ThemeProvider>
//   )

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from './components/login/loginPage';
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Header from "./components/Header.jsx";
import EventsPage from "./components/events/EventsPage.jsx";
import EventDetailsPage from "./components/events/EventDetailsPage.jsx";
import BookingPage from "./components/booking/BookingPage.jsx";
import MyBookingsPage from "./components/my-bookings/MyBookingsPage.jsx";

import "./styles/theme.css";
import "./styles/styles.css";

export default function App() {

  // return (
  //   <ThemeProvider>
  //     <LoginPage/>
  //   </ThemeProvider>
  // )  

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}
  // return (
  //   <>
  //     {/* <Header /> */}
  //     <main>
  //       <h1>Good morning, Zamzameh! :)</h1>
  //     </main>
  //   </>
  // )
// }

// export default App
