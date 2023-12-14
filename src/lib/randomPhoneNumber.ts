export function generateFakePhoneNumber() {
  // Start with '0'
  let phoneNumber = "0";

  // Generate the remaining 9 digits
  for (let i = 0; i < 9; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }

  return phoneNumber;
}
