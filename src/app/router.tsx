import { BrowserRouter, Route, Routes } from "react-router-dom";
import StretchPrototype, { type Step } from "@/features/stretch/StretchPrototype";
import NotFound from "@/pages/NotFound";

const Screen = ({ step }: { step: Step }) => <StretchPrototype initialStep={step} />;

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Screen step="landing" />} />
      <Route path="/explainer" element={<Screen step="explainer" />} />
      <Route path="/quiz" element={<Screen step="quiz" />} />
      <Route path="/blueprint" element={<Screen step="built" />} />
      <Route path="/customize" element={<Screen step="builder" />} />
      <Route path="/swap" element={<Screen step="swap" />} />
      <Route path="/week" element={<Screen step="week" />} />
      <Route path="/home" element={<Screen step="home" />} />
      <Route path="/credits" element={<Screen step="wallet" />} />
      <Route path="/future" element={<Screen step="future" />} />
      <Route path="/pathways" element={<Screen step="pathways" />} />
      <Route path="/journey" element={<Screen step="journey" />} />
      <Route path="/operator" element={<Screen step="care" />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
