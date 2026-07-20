import { BrowserRouter, Route, Routes } from "react-router-dom";
import JourneyApp from "@/features/journey/JourneyApp";
import StretchPrototype, { type Step } from "@/features/stretch/StretchPrototype";
import NotFound from "@/pages/NotFound";

const Legacy = ({ step }: { step: Step }) => <StretchPrototype initialStep={step} />;

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* New continuous flow */}
      <Route path="/" element={<JourneyApp />} />

      {/* Legacy prototype (preserved) */}
      <Route path="/prototype" element={<Legacy step="landing" />} />
      <Route path="/prototype/explainer" element={<Legacy step="explainer" />} />
      <Route path="/prototype/quiz" element={<Legacy step="quiz" />} />
      <Route path="/prototype/blueprint" element={<Legacy step="built" />} />
      <Route path="/prototype/customize" element={<Legacy step="builder" />} />
      <Route path="/prototype/swap" element={<Legacy step="swap" />} />
      <Route path="/prototype/week" element={<Legacy step="week" />} />
      <Route path="/prototype/home" element={<Legacy step="home" />} />
      <Route path="/prototype/credits" element={<Legacy step="wallet" />} />
      <Route path="/prototype/future" element={<Legacy step="future" />} />
      <Route path="/prototype/pathways" element={<Legacy step="pathways" />} />
      <Route path="/prototype/journey" element={<Legacy step="journey" />} />
      <Route path="/prototype/operator" element={<Legacy step="care" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
