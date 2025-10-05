import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong!!!");
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        //edo valame await gia na perimenoyme na epistrepsei to object gia na min mas bgazei eror sto Meals.jsx epeidi den exei erthei akoma apanthsh
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wronG!!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    //parakato ean exo config kai ean i method einai eite get eite undefined, EITE ean den exo config mpainei
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
}
