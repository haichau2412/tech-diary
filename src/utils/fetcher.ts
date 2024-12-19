import axios from "axios";

export const getWithCredential = async <T>(url: string): Promise<T> => {
  const res = await axios.get<T>(url, {
    withCredentials: true,
  });
  return res.data;
};

export const postWithCredential = async <T>(
  url: string,
  body = {},
): Promise<T> => {
  const res = await axios.post<T>(
    url,
    { ...body },
    {
      withCredentials: true,
    },
  );
  return res.data;
};
