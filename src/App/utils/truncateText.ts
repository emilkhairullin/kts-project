export const truncateText = (input: string): string => {
  if (input.length > 50) {
    let substring = input.substring(0, 40);
    let words = substring.split(" ");
    words.pop();
    return words.join(" ") + "...";
  }
  return input;
};
