export const truncateText = (input: string, letters = 50): string => {
  if (input.length > letters) {
    let substring = input.substring(0, letters);
    let words = substring.split(" ");
    words.pop();
    return words.join(" ") + "...";
  }
  return input;
};
