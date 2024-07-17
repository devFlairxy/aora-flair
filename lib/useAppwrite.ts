import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useApprwite = (fn: () => any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => fetchData();

  return { data, isLoading, refetch };
};

export default useApprwite;
