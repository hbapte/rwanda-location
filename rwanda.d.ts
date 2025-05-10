// rwanda.d.ts
declare module "rwanda" {
  export function Provinces(): string[];
  export function Districts(province: string): string[];
  export function Sectors(province: string, district: string): string[];
  export function Cells(province: string, district: string, sector: string): string[];
  export function Villages(province: string, district: string, sector: string, cell: string): string[];
}