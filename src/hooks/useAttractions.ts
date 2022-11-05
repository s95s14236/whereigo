import useSWR from "swr"
import fetcher from "../libs/fetch";
import IApiResponse from "../models/IApiResponse.interface";
import IAttraction from "../models/IAttraction.interface";

export default function useAttractions(url: string) {
  return useSWR<IApiResponse<{ attractions: IAttraction[] }>>(
    url,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
}