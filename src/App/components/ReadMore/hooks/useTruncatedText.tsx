import { useState, useEffect, useCallback } from "react";

export const useTruncatedText = (full_text: string, limit: number) => {
  const [text, setText] = useState("");
  const [isTruncable, setIsTruncable] = useState(false);

  useEffect(() => {
    const words = full_text.split(" ");
    if (words.length < limit) {
      setText(full_text);
    } else {
      setText(words.slice(0, limit).join(" ") + "... ");
      setIsTruncable(true);
    }
  }, [full_text, limit]);

  const showText = useCallback(() => {
    setText(full_text);
    setIsTruncable(false);
  }, [full_text]);

  return { text, isTruncable, showText };
};
