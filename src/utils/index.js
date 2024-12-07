export const checkPasswordValidity = value => {
  const isEmpty = '';
  if (value == isEmpty) {
    return 'Password can not be empty';
  }

  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'Password should not contain Whitespaces.';
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return 'Password should have at least one Uppercase Character.';
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(value)) {
    return 'Password should have at least one Lowercase Character.';
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return 'Password should contain at least one Digit.';
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(value)) {
    return 'Password should contain at least one Special Symbol.';
  }

  const isValidLength = /^.{8,16}$/;
  if (!isValidLength.test(value)) {
    return 'Password should be 8-16 Characters Long.';
  }

  return null;
};

export const genrateDays = (start, end) => {
  // Create an empty array to store the range of numbers
  const range = [];

  // Iterate from the start number to the end number, inclusive
  for (let i = start; i <= end; i++) {
    // Push the current number into the range array
    range.push({id: i, title: i.toString()});
  }

  // Return the range array
  return range;
};
