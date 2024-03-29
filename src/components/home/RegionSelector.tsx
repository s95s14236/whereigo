import IRegion from "../../models/IRegion.interface";
import regionTW from "../../assets/regionTW.json";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar } from "@mui/material";
import { useState } from "react";

interface Props {
  handleRegion: (region: IRegion) => void;
}

export default function RegionSelector({ handleRegion }: Props) {
  // region selector redux state
  const regionSearch: IRegion = useSelector((state: RootState) => state.region);
  const [region, setRegion] = useState<IRegion>({ region: regionSearch.region, town: regionSearch.town });

  const trigger = useScrollTrigger({
    target: undefined,
  });

  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion({ region: event.target.value, town: '' });
  };

  const handleTownChange = (event: SelectChangeEvent) => {
    setRegion((prev) => ({ ...prev, town: event.target.value }));
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "14px 28px",
          justifyContent: "space-between",
          background: "white",
        }}
      >
        <FormControl sx={{ width: "120px", height: "50px" }}>
          <InputLabel id="demo-select-small">縣市</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={region.region}
            label="選擇縣市"
            onChange={handleRegionChange}
            sx={{ height: "100%", width: "100%" }}
          >
            <MenuItem value="">
              <em>縣市</em>
            </MenuItem>
            {regionTW.map((region) => (
              <MenuItem key={region.name} value={region.name}>
                {region.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "120px", height: "50px" }}>
          <InputLabel id="demo-select-small">區域</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={region.town}
            label="選擇區域"
            onChange={handleTownChange}
            sx={{ height: "100%", width: "100%" }}
          >
            <MenuItem value="">
              <em>區域</em>
            </MenuItem>
            {regionTW.filter((reg) => reg.name === region.region).length > 0 &&
              regionTW
                .filter((reg) => reg.name === region.region)[0]
                .districts.map((town) => (
                  <MenuItem key={town.zip} value={town.name}>
                    {town.name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ width: "80px", height: "50px" }}
          onClick={() => handleRegion(region)}
        >
          搜尋
        </Button>
      </AppBar>
    </Slide>
  );
}
