
import { useEffect, useState } from "react";

const useGetData = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error("Wystąpił błąd");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError("Nie udało się pobrać danych");
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export default useGetData;
