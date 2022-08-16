import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface Props {
    children: React.ReactElement;
}

export default function ScrollTop({ children }: Props) {
    const trigger = useScrollTrigger({
        target: undefined,
        disableHysteresis: true,
        threshold: 300,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 80, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}