import { District, Province, Ward } from "./geometry-type";

type VietNamGeography = {
  province: Province[] | null;
  district: District[] | null;
  ward: Ward[] | null;
  isLoading: boolean;
};

export type { VietNamGeography };
