import { Route, Routes } from "react-router-dom";
import Shell from "@/components/layout/Shell";
import Auth from "@/pages/Auth";
import ConsoleLayout, { ConsoleSection } from "@/pages/Dashboard";
import Docs from "@/pages/Docs";
import Home from "@/pages/Home";
import LocaleRedirect from "@/pages/LocaleRedirect";
import ModelDetail from "@/pages/ModelDetail";
import ModelsPage from "@/pages/Models";
import NotFound, { UnknownRoute } from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LocaleRedirect />} />
      <Route path="/:locale" element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="models" element={<ModelsPage />} />
        <Route path="models/:slug" element={<ModelDetail />} />
        <Route path="docs" element={<Docs />} />
        <Route path="dashboard" element={<ConsoleLayout />}>
          <Route index element={<ConsoleSection />} />
          <Route path="catalog" element={<ConsoleSection />} />
          <Route path="sessions" element={<ConsoleSection />} />
          <Route path="keys" element={<ConsoleSection />} />
          <Route path="billing" element={<ConsoleSection />} />
          <Route path="settings" element={<ConsoleSection />} />
        </Route>
        <Route path="signin" element={<Auth mode="signin" />} />
        <Route path="signup" element={<Auth mode="signup" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<UnknownRoute />} />
    </Routes>
  );
}
