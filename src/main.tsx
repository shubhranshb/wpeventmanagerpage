import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { TicketBookingPage } from "./pages/TicketBookingPage.tsx";
import { SingleDayEventPage } from "./pages/SingleDayEventPage.tsx";
import { MultiDayEventPage } from "./pages/MultiDayEventPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/festival" element={<MultiDayEventPage />} />
      <Route path="/show" element={<SingleDayEventPage />} />
      <Route path="/tickets/booking" element={<TicketBookingPage />} />
    </Routes>
  </BrowserRouter>
);
