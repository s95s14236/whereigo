import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IAttraction from "../../models/IAttraction.interface";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Label, Text, Title } from "../../components/common/Text";
import DetailSlideAppBar from "../../components/Attraction/DetailSlideAppBar";
import PlaceIcon from "@mui/icons-material/Place";
import { Flex } from "../../components/common/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AttractionDetailPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [attraction, setAttraction] = useState<IAttraction | null>(null);
    // attraction redux state
    const attractions: IAttraction[] = useSelector((state: RootState) => state.attraction.attractions);

    const Img = styled.img({
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"
    });

    useEffect(() => {
        init();
        console.log("AttractionDetailPage/ attractionId=", params.attractionId);
        // setAttraction({
        //     "id": 6,
        //     "Id": "C1_315080500H_000014",
        //     "Name": "長虹橋",
        //     "Zone": "",
        //     "Toldescribe": "長虹橋優雅的拱形橋身橫跨在秀姑巒溪出海口處兩岸，在山海交際之處形成一道美麗的虹影，成為東海岸的著名拍照地標，而這裡也是泛舟的終點站，一艘艘疲倦又滿足的泛舟筏在這裡靠岸。沿著步道在溪畔漫步，水鳥輕巧的在河床邊覓食，自行車來來往往，兩旁的植物隨季節變換風景，若是累了，不妨到附近的新太平洋1號店稍作休息，喝杯下午茶，度過悠閒的時光。出海口的奚卜蘭島，又稱作獅球嶼，綠意蒼蒼的小島是當地海岸阿美族的聖地，也是火山集塊岩構成的島嶼，由於溪流阻隔，保有相當天然的生態相貌，在河口覓食的鳥類、洄游魚類和蝦蟹都會在此聚集，是做生態觀察的好地點。",
        //     "Description": "長虹橋橫跨秀姑巒溪，連接靜浦與港口兩聚落，亦是秀姑巒溪泛舟的終點站；橋分新舊兩座橋，新橋採鮮艷亮眼的橙紅色，橋面規劃有快慢車道分隔的腳踏車及人行專用步道，並配合泛舟活動，設置了八座觀景台；橋上可遠眺出海囗的奚卜蘭島，因登島不易，島上仍維持原始林樣貌，俯瞰河面可見許多潔白如玉的大岩塊，其為巨型石灰岩，因其石潔白如玉，因而得到了「秀姑漱玉」的美名。",
        //     "Tel": "886-3-8671326",
        //     "Add": "花蓮縣977豐濱鄉台11線68公里處",
        //     "Zipcode": "977",
        //     "Region": "花蓮縣",
        //     "Town": "豐濱鄉",
        //     "Travellinginfo": "南下：由花蓮火車站前搭往成功、靜浦或台東等地的花蓮、鼎東客運海線班車，在長虹橋站下車，再依指標前往即可抵達。北上：由台東火車站前搭往花蓮的鼎東、花蓮客運海線班車，在長虹橋站下車，再依指標前往即可抵達。詳細時刻表及車資請洽花蓮客運(查詢電話：03-8338146~8 / 花蓮汽車客運公司)",
        //     "Opentime": "全天候開放",
        //     "Picture1": "https://www.eastcoast-nsa.gov.tw/image/28957/640x480",
        //     "Picdescribe1": "橫跨秀姑巒溪，連接靜浦與港口兩聚落的新長虹橋",
        //     "Picture2": "",
        //     "Picdescribe2": "",
        //     "Picture3": "",
        //     "Picdescribe3": "",
        //     "Map": "",
        //     "Gov": "315080500H",
        //     "Px": 121.489040,
        //     "Py": 23.468450,
        //     "Orgclass": "",
        //     "Class1": "8",
        //     "Class2": "",
        //     "Class3": "",
        //     "Level": "",
        //     "Website": "",
        //     "Parkinginfo": "",
        //     "Parkinginfo_Px": null,
        //     "Parkinginfo_Py": null,
        //     "Ticketinfo": "免費",
        //     "Remarks": "",
        //     "Keyword": "",
        //     "Changetime": "2021-11-04T11:31:29+08:00"
        // });
    }, [])

    function init() {
        const attractionId = params.attractionId;
        if (!attractionId) {
            console.log("發生錯誤");
            return;
        }

        const attraction = attractions.filter(attraction => +attraction.id === +attractionId)[0];
        if (attraction) {
            setAttraction(attraction);
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/attraction/${params.attractionId}`).then(async data => {
                const attraction = (await data.json()).data.attraction;
                setAttraction(attraction);
            })
        }
    }

    function back() {
        navigate(-1);
    }

    function addToFavorite() {

    }

    function onLocationClick() {
        console.log("onLocationClick");
        if (!attraction?.Px || !attraction?.Py) {
            return;
        }
        window.open(`https://www.google.com/maps/search/?api=1&query=${attraction.Py}%2C${attraction.Px}`);
    }

    return (
        <Box sx={{ position: "relative" }}>

            <DetailSlideAppBar >
                <Box sx={{ display: 'flex', flexDirection: 'row', padding: "12px", justifyContent: 'space-between', background: "white" }}>
                    <IconButton onClick={back}>
                        <ArrowBackIosNewIcon sx={{ color: "black" }} />
                    </IconButton>

                    {/* <IconButton onClick={addToFavorite}>
                        <FavoriteBorderIcon sx={{ color: "black" }} />
                    </IconButton> */}
                </Box>
            </DetailSlideAppBar>
            <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'row', padding: "12px", justifyContent: 'space-between', zIndex: 100 }}>
                <IconButton onClick={back} sx={{ background: "rgba(0,0,0,0.3)" }}>
                    <ArrowBackIosNewIcon sx={{ color: "white" }} />
                </IconButton>

                {/* <IconButton onClick={addToFavorite} sx={{ background: "rgba(0,0,0,0.3)" }}>
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                </IconButton> */}
            </Box>
            {attraction &&
                <Box sx={{ position: "relative", width: "100%", backgroundColor: "#FAFAFA", height: "280px" }}>
                    <Img src={attraction.Picture1} />
                    <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", pt: 1, textShadow: "0 0 0.1em #000" }}>
                        <Title color="white" >{attraction.Region}</Title>
                        <Text color="white" fontSize={18} >{attraction.Town}</Text>
                    </Box>
                </Box>
            }
            {
                attraction &&
                <Box sx={{ p: 3 }}>
                    <Title>{attraction.Name}</Title>
                    <Text color="gray">{attraction.Description}</Text>
                    <Label >地址</Label>
                    <Flex flexDirection="row" onClick={onLocationClick} >
                        <PlaceIcon color="info" />
                        <Text>
                            {attraction.Add}
                        </Text>
                    </Flex>
                    {
                        attraction.Opentime &&
                        <div>
                            <Label >營業時間</Label>
                            <Text>{attraction.Opentime}</Text>
                        </div>
                    }
                    {
                        attraction.Ticketinfo &&
                        <div>
                            <Label >票價資訊</Label>
                            <Text>{attraction.Ticketinfo}</Text>
                        </div>
                    }
                    {
                        attraction.Travellinginfo &&
                        <div>
                            <Label >交通資訊</Label>
                            <Text><div dangerouslySetInnerHTML={{__html: attraction.Travellinginfo}}></div></Text>
                        </div>
                    }
                    {
                        attraction.Remarks &&
                        <div>
                            <Label >注意事項</Label>
                            <Text>{attraction.Remarks}</Text>
                        </div>
                    }
                    {
                        attraction.Website &&
                        <div>
                            <Label >官方網站</Label>
                            <Text><a href={attraction.Website}>{attraction.Website}</a></Text>
                        </div>
                    }
                </Box>
            }
        </Box>
    )
}