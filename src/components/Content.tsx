import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CommunityPage from "../views/Community/CommunityPage";
import FavoritePage from "../views/Favorite/FavoritePage";
import HomePage from "../views/Home/HomePage";



export default function Content() {
    const bottomNavigationIndex = useSelector((state: RootState) => state.bottomNavigation.index);

    return (
        <Box sx={{pb: 7}}>
            { bottomNavigationIndex === 0 && <HomePage />}
            { bottomNavigationIndex === 1 && <CommunityPage />}
            { bottomNavigationIndex === 2 && <FavoritePage />}
        </Box>
    )
}