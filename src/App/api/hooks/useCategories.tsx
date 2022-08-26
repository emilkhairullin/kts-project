import { useEffect, useState } from "react";

import { getCategories } from "@api/api";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    try {
      (async function () {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      })();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { categories, loading, error };
};
