import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AttractionCard from "../../components/home/AttractionCard";
import RegionSelector from "../../components/home/RegionSelector";
import ScrollTop from "../../components/home/ScrollTop";
import SkeletonCard from "../../components/home/SkeletonCard";
import IAttraction from "../../models/IAttraction.interface";
import IRegion from "../../models/IRegion.interface";
import { RootState } from "../../store";
import { setAttractions } from "../../store/attraction/attraction.slice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useQueryClient } from "@tanstack/react-query";
import useAttractions from "../../hooks/useAttractions";

export default function HomePage() {
  const navigate = useNavigate();
  const [lastElement, setLastElement] = useState<Element | null>(null);
  // attraction redux state
  const attractions: IAttraction[] = useSelector(
    (state: RootState) => state.attraction.attractions
  );
  // region selector redux state
  const region: IRegion = useSelector((state: RootState) => state.region);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useAttractions(region.region, region.town);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    })
  );

  useEffect(() => {
    if (data?.pages) {
      const attractions: IAttraction[] = data?.pages.flatMap(
        (item) => item.attractions
      );
      dispatch(setAttractions(attractions));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  // 更改縣市&區域 並 click搜尋
  function handleRegion(): void {
    queryClient.clear();
    fetchNextPage();
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  }

  function onAttractionCardClick(attractionId: number): void {
    navigate(`/attraction/${attractionId}`);
  }

  return (
    <Box>
      <div id="back-to-top-anchor">
        <RegionSelector handleRegion={handleRegion} />
      </div>
      <Box sx={{ marginTop: 12 }}>
        {attractions.length > 0 &&
          attractions.map((attraction, index) => {
            return index === attractions.length - 1 ? (
              <div
                key={attraction.Id + index}
                ref={setLastElement}
                onClick={() => onAttractionCardClick(attraction.id)}
              >
                <AttractionCard attraction={attraction} />
              </div>
            ) : (
              <div
                key={attraction.Id + index}
                onClick={() => onAttractionCardClick(attraction.id)}
              >
                <AttractionCard attraction={attraction} />
              </div>
            );
          })}
        {(isFetching || isFetchingNextPage) && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </Box>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
