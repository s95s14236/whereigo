import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import { useDispatch, useSelector } from "react-redux";
import { setIndex } from "../store/bottomNavigation/bottomNavigation.slice";
import { RootState } from "../store";


export default function Footer() {
    const bottomNavigationIndex = useSelector((state: RootState) => state.bottomNavigation.index);
    const dispatch = useDispatch();

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={bottomNavigationIndex}
                onChange={(event, newValue) => {
                    dispatch(setIndex(newValue));
                }}
            >
                <BottomNavigationAction icon={<HomeIcon />} />
                <BottomNavigationAction icon={<PeopleIcon />} />
                <BottomNavigationAction icon={<FavoriteIcon />} />
            </BottomNavigation>
        </Paper>
    )
}