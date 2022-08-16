import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonCard() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ p: 2, width: "80%", boxShadow: 2, borderRadius: 2, m: 1, textAlign: "start" }}>
                <Skeleton variant="rectangular" width={'100%'} height={180} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
            </Card>
        </Box>
    )
}