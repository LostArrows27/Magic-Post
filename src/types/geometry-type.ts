type Province = {
  PROVINCE_ID: number;
  PROVINCE_CODE: string;
  PROVINCE_NAME: string;
  VALUE: string;
};

type District = {
  DISTRICT_ID: number;
  DISTRICT_VALUE: string;
  DISTRICT_NAME: string;
  PROVINCE_ID: number;
  VALUE: string;
};

type Ward = {
  WARDS_ID: number;
  WARDS_NAME: string;
  DISTRICT_ID: number;
  LOCATION_CODE: string;
};

type Subward = {
  id: string;
  name: string;
  l: {
    lat: number;
    lng: number;
  };
  type: string;
};

// export all

export type { Province, District, Ward, Subward };
