function validateInput(input) {
  if (typeof input === "string") {
    const hexRegex = /^[0-9a-fA-F]{24}$/;
    if (hexRegex.test(input)) {
      return true;
    }
  }
  if (input instanceof Uint8Array && input.length === 12) {
    return true;
  }
  return Number.isInteger(input);
}
module.exports = { validateInput };
