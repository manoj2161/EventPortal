export const validateRollNo = (rollNo) => {
  if (typeof rollNo !== "string") {
    return false;
  }
  const match = rollNo.trim().match(/^H(\d{2})(\d{4})$/);
  if (!match) {
    return false;
  }
  
};
