import { useInfiniteQuery } from "@tanstack/react-query";

function useAttractions(region?: string, town?: string) {
  return useInfiniteQuery(
    ["attractions"],
    async ({ pageParam = 0 }) => {
      let url: string;
      if (region && region.trim() !== "") {
        url = `${process.env.REACT_APP_API_URL}/attraction/region/${region}?${
          town && town.trim() === "" ? "" : "town=" + town
        }${pageParam > 0 ? "&page=" + pageParam : ""}`;
      } else {
        url = `${process.env.REACT_APP_API_URL}/attraction${
          pageParam > 0 ? "?page=" + pageParam : ""
        }`;
      }
      console.log(url);
      const data = await fetch(url);
      const result = (await data.json()).data;
      return result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      cacheTime: 300000,
    }
  );
}

export default useAttractions;
