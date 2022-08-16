import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface Props {
    children: React.ReactElement;
}

export default function DetailSlideAppBar({ children }: Props) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        target: undefined,
        threshold: 255
    });

    return (
        <Slide appear={true} direction="down" in={trigger} timeout={0}>
            <AppBar elevation={0}>
                {children}
            </AppBar>
        </Slide>
    )
}