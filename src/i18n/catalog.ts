import type { Messages } from "./messages";
import { ar } from "./locales/ar";
import { bn } from "./locales/bn";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { hi } from "./locales/hi";
import { id } from "./locales/id";
import { ja } from "./locales/ja";
import { pt } from "./locales/pt";
import { ru } from "./locales/ru";
import { zh } from "./locales/zh";
import type { Locale } from "./locales";

/** Toutes les langues. Réservé au build (sitemap, HTML). Le navigateur charge la sienne via load.ts. */
export const messages: Record<Locale, Messages> = { fr, en, es, de, zh, hi, id, pt, ar, bn, ru, ja };
