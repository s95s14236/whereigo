import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IAttraction from "../../models/IAttraction.interface";
import styled from "@emotion/styled";
import PlaceIcon from "@mui/icons-material/Place";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MouseEvent, memo } from "react";

interface Props {
    attraction: IAttraction
}

function AttractionCard({ attraction }: Props) {

    let Image = styled.img({
        width: "100%",
        height: "220px",
        borderRadius: "6px",
        objectFit: "contain",
        objectPosition: "center"
    });

    let Title = styled.div({
        fontWeight: "bold",
        fontSize: "18px",
        marginTop: "16px",
        paddingLeft: "4px"
    });

    let Region = styled.div({
        fontSize: "14px",
    });

    function onLocationClick(event: MouseEvent) {
        event.stopPropagation();
        if (!attraction?.Px || !attraction?.Py) {
            return;
        }
        window.open(`https://www.google.com/maps/search/?api=1&query=${attraction.Py}%2C${attraction.Px}`);
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ p: 2, width: "80%", boxShadow: 2, borderRadius: 2, m: 1, textAlign: "start" }}>
                <Box sx={{background: "#FAFAFA", width: "100%", height: "220px"}}>
                    {attraction.Picture1 && <Image src={attraction.Picture1} alt={attraction.Name} loading="lazy" />}
                </Box>
                <Title>{attraction.Name}</Title>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: '4px' }}>
                    <div onClick={onLocationClick}>
                        <PlaceIcon color="info" />
                    </div>
                    {(attraction.Region || attraction.Town) && <Region>{attraction.Region}, {attraction.Town}</Region>}
                    <Box sx={{ flex: 1 }}></Box>
                    {/* <IconButton>
                        <FavoriteBorderIcon sx={{ color: pink[500] }} />
                    </IconButton> */}
                </Box>
            </Card>
        </Box>
    )
}

export default memo(AttractionCard);