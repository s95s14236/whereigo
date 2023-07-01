import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AttractionCard from "../../components/home/AttractionCard";
import RegionSelector from "../../components/home/RegionSelector";
import ScrollTop from "../../components/home/ScrollTop";
import SkeletonCard from "../../components/home/SkeletonCard";
import IAttraction from "../../models/IAttraction.interface";
import IRegion from "../../models/IRegion.interface";
import { RootState } from "../../store";
import { setAttractions, incrementPageNum, resetPageNum } from "../../store/attraction/attraction.slice";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [pageNum, setPageNum] = useState<number>(0);
  const [lastElement, setLastElement] = useState<Element | null>(null);

  // attraction redux state
  const attractions: IAttraction[] = useSelector((state: RootState) => state.attraction.attractions);
  // query attraction api page num
  const pageNum: number = useSelector((state: RootState) => state.attraction.pageNum);
  // region selector redux state
  const region: IRegion = useSelector((state: RootState) => state.region);
  const dispatch = useDispatch();

  const observer = useRef(new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      dispatch(incrementPageNum());
      // setPageNum(page => page + 1);
    }
  }))

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
    }
  }, [lastElement])

  useEffect(() => {
    // TODO: 從detail page 回來會有重撈最後一頁問題
    console.log('pageNum', pageNum);
    /**
     * 當往下滑到底的時候撈新的10筆
     */
    fetchAttractions();
  }, [pageNum])

  function init(): void {
    if (attractions && attractions.length > 0) {
      setAttractions(attractions);
      return;
    }
    fetchAttractions();
  }

  /**
   * fetch 景點
   * @param isClear 是否重新set attraction array
   */
  function fetchAttractions(isClear: boolean = false): void {
    setIsLoading(true);
    let url: string;
    if (region.region.trim() !== "") {
      url = `${process.env.REACT_APP_API_URL}/attraction/region/${region.region}?${region.town.trim() === "" ? "" : "town=" + region.town}${pageNum > 0 ? "&page=" + pageNum : ""}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/attraction${pageNum > 0 ? "?page=" + pageNum : ""}`;
    }
    console.log(url);

    fetch(url).then(async data => {
      const news: IAttraction[] = (await data.json()).data.attractions;
      if (news.length <= 0) {
        setLastElement(null);
        return;
      }
      if (isClear) {
        dispatch(setAttractions([...news]));
      } else {
        const all = [...attractions, ...news];
        dispatch(setAttractions(all.filter((attraction, index) => all.findIndex(attr => attr.id === attraction.id) === index)));
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }

  // 更改縣市&區域 並 click搜尋
  function handleRegion(): void {
    dispatch(setAttractions([]));
    dispatch(resetPageNum());
    // dispatch(incrementPageNum());
    fetchAttractions(true);
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) {
        anchor.scrollIntoView({
            block: 'center',
        });
    }
  }

  function onAttractionCardClick(attractionId: number): void {
    navigate(`/attraction/${attractionId}`);
  }

  return (
    <Box>
      <div id="back-to-top-anchor" >
        <RegionSelector handleRegion={handleRegion} />
      </div>
      <Box sx={{ marginTop: 12 }}>
        {attractions.length > 0 && attractions.map((attraction, index) => {
          return index === attractions.length - 1 ?
            <div key={attraction.Id + index} ref={setLastElement} onClick={() => onAttractionCardClick(attraction.id)}>
              <AttractionCard attraction={attraction} />
            </div> :
            <div key={attraction.Id + index} onClick={() => onAttractionCardClick(attraction.id)}>
              <AttractionCard attraction={attraction} />
            </div>
        })}
        {isLoading && <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>}
      </Box>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  )
}