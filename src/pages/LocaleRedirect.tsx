import { Navigate } from "react-router-dom";
import { detectLocale } from "@/i18n/locales";

export default function LocaleRedirect() {
  return <Navigate to={`/${detectLocale()}`} replace />;
}
