export function generateRandomDOB(age: number | string) {
  age = Number(age);

  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;

  // Generate a random month (0-11, as JavaScript counts months from 0)
  const month = Math.floor(Math.random() * 12);

  // Generate a random day of the month
  // Note: This does not account for different month lengths or leap years
  const day = Math.floor(Math.random() * 28) + 1; // 1-28 to keep it simple

  // Construct the DOB in a standard format
  // Adjust the month by 1 since JavaScript months are 0-indexed
  return new Date(birthYear, month, day);
}
