export function convertLocationID(locationID: string): string {
  // if gd_number_number => return "Office number-number"
  // if tk_number => return "Central Hub number"

  const gdRegex = /^gd_(\d+)_(\d+)$/;
  const tkRegex = /^tk_(\d+)$/;
  const gdMatch = gdRegex.exec(locationID);
  const tkMatch = tkRegex.exec(locationID);
  if (gdMatch) {
    return `Điểm giao dịch ${gdMatch[1]}-${gdMatch[2]}`;
  } else if (tkMatch) {
    return `Điểm tập kết ${tkMatch[1]}`;
  } else {
    return locationID;
  }
}
