import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IAttraction from "../../models/IAttraction.interface";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Label, Text, Title } from "../../components/common/Text";
import DetailSlideAppBar from "../../components/Attraction/DetailSlideAppBar";
import PlaceIcon from "@mui/icons-material/Place";
import { Flex } from "../../components/common/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DOMPurify from "dompurify";

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
        function init() {
            const attractionId = params.attractionId;
            if (!attractionId) {
                console.log("發生錯誤");
                return;
            }
    
            const attraction = attractions.filter(attraction => +attraction.id === +attractionId)[0];
    
            if (attraction) {
                setAttraction({
                    ...attraction,
                    Travellinginfo: DOMPurify.sanitize(attraction.Travellinginfo),
                    Remarks: DOMPurify.sanitize(attraction.Remarks)
                });
            } else {
                fetch(`${process.env.REACT_APP_API_URL}/attraction/${params.attractionId}`).then(async data => {
                    const attraction = (await data.json()).data.attraction;
                    setAttraction(attraction);
                })
            }
        }
        init();
    }, [attractions, params.attractionId])

    function back() {
        navigate(-1);
    }

    // function addToFavorite() {

    // }

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
                            <Text><div dangerouslySetInnerHTML={{__html: attraction.Remarks}}></div></Text>
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