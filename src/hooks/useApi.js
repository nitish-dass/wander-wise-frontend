import { useState, useEffect } from "react";
import api from "../api/axios"

const useApi = (endpoint, options = {}, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    api(endpoint, options)
      .then((res) => {
        if (mounted) setData(res.data);
        // if (mounted) setData(res.data.data); yesle garda aru tira data.data repeat gari basnu pardaena 
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error };
};

export default useApi;


