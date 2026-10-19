import type { CatalogModel } from "@/data/models";

export function modelPriceLabel(
  model: CatalogModel,
  fromWord: string,
  perHour: string,
) {
  return model.pricing.from ? `${fromWord} ${perHour}` : perHour;
}
