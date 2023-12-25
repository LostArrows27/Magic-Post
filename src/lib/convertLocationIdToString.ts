import { District, Province, Ward } from "@/types/geometry-type";

export default function convertLocationIdToString({locationId,district,province,ward}:{locationId: string,district: District[] | null ,province: Province[] | null, ward: Ward[]| null}) {
    const locationIdArray = locationId.split("_");
    const provinceId = locationIdArray[1];
    const districtId = locationIdArray[2];
    const wardId = locationIdArray[3];
    let locationString = ``
   if(provinceId && province ) {
       const provinceName = province.find((item) => item.PROVINCE_ID === Number(provinceId))?.PROVINCE_NAME;
         locationString = `${provinceName}` 

   }
    
    if(districtId && district) {
        const districtName = district.find((item) => item.DISTRICT_ID === Number(districtId))?.DISTRICT_NAME;
        locationString = `${districtName}, ` + locationString
    }
    if(wardId && ward) {
        const wardName = ward.find((item) => item.WARDS_ID === Number(wardId))?.WARDS_NAME;
        locationString = `${wardName}, ` + locationString
    }
  
    return locationString;
}