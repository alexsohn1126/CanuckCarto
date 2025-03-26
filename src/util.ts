import brandData from "../data/companies.json";
import shopMap from "../data/shopToCompany.json";
import { ShopDescription } from "./types";

const brand: Record<string, ShopDescription> = brandData;
const shopToCompany: Record<string, string> = shopMap;

export function getShopDescription(name: string): ShopDescription | undefined {
  const currCompany = name in brand ? name : shopToCompany[name];
  const companyObj = name === undefined ? undefined : brand[currCompany];
  return companyObj;
}
