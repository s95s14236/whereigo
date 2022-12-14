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
    // init();
    // dispatch(setAttractions([{
    //   "id": 1,
    //   "Id": "C1_313020000G_000026",
    //   "Name": "宏亞食品巧克力觀光工廠",
    //   "Zone": "",
    //   "Toldescribe": "宏亞食品巧克力觀光工廠是一座以巧克力為主題的觀光工廠，建築設計、展場文字、陳列物、戶外景觀及相關造型皆與巧克力密不可分，全棟為綠建築，展場設計依照建築外觀之透光與否進行規劃，節能省碳，此外，展場更提供豐富的巧克力相關知識(含巧克力3500年歷史)為一寓教於樂之專業型廠館，是休閒娛樂絕佳去處。",
    //   "Description": "巧克力共和國是一座以巧克力為主題的觀光工廠，建築設計、館內主題設計皆以巧克力為主題，這裡也提供豐富的巧克力相關知識，亦可以DIY創作巧克力，為一寓教於樂、適合親子休閒娛樂的絕佳去處。",
    //   "Tel": "886-3-3656555",
    //   "Add": "桃園縣八德市建國路386號",
    //   "Zipcode": "33451",
    //   "Region": "桃園市",
    //   "Town": "八德區",
    //   "Travellinginfo": "",
    //   "Opentime": "",
    //   "Picture1": "",
    //   "Picdescribe1": "",
    //   "Picture2": "",
    //   "Picdescribe2": "",
    //   "Picture3": "",
    //   "Picdescribe3": "",
    //   "Map": "",
    //   "Gov": "313020000G",
    //   "Px": 121.297187,
    //   "Py": 24.943325,
    //   "Orgclass": "觀光工廠",
    //   "Class1": "1",
    //   "Class2": "14",
    //   "Class3": "",
    //   "Level": "9",
    //   "Website": "",
    //   "Parkinginfo": "",
    //   "Parkinginfo_Px": 121.297187,
    //   "Parkinginfo_Py": 24.943325,
    //   "Ticketinfo": "收費方式請電洽",
    //   "Remarks": "詳細參觀訊息請逕洽廠商網站說明",
    //   "Keyword": "桃園，宏亞，巧克力，觀光工廠",
    //   "Changetime": "2013-07-13T15:00:00+08:00"
    // },
    // {
    //   "id": 2,
    //   "Id": "C1_313020000G_000105",
    //   "Name": "台灣金屬創意館",
    //   "Zone": "",
    //   "Toldescribe": "台灣金屬創意館為第一座金屬造型觀光工廠，來這裡可讓大家看到並觸摸到金屬柔軟的一面，館區內充滿各種金屬的驚奇與創意，是一個極具觀光、休閒、知性與文化的好地方。台灣金屬創意館為志鋼金屬股份有限公司創立之品牌，志鋼金屬是由六位志同道合的的好朋友攜手創立，1995年成立之時，即專注於板金鋼鐵加工上，因而將公司命名為志鋼金屬，十多年來，六人同心協力使公司一路成長茁壯。2010年，本著創新、突破、品牌、回饋之思維，決議推動工廠觀光化，將製造業與服務業結合，打造全國第一座板金觀光工廠。2013年正式通過觀光工廠評鑑，成立台灣金屬創意文化館。志鋼金屬為專業板金製造廠，一貫化生產流程讓參觀者可在志鋼看到完整的流程，由雷射切割、自動沖孔機進行金屬板下料，再由電腦折床進行成形作業，接著由銲接部門已氬銲、CO2銲接或自動銲接系統進行銲接加工與研磨，之後由塗裝部門進行產品塗裝與印刷，最後由組立部門以手動或氣動工具進行產品組裝與包裝",
    //   "Description": "台灣金屬創意館為第一座金屬造型觀光工廠，來這裡可讓大家看到並觸摸到金屬柔軟的一面，館區內充滿各種金屬的驚奇與創意，是一個極具觀光、休閒、知性與文化的好地方。",
    //   "Tel": "886-6-2036735#245",
    //   "Add": "台南市永康區永科環路598號",
    //   "Zipcode": "71041",
    //   "Region": "臺南市",
    //   "Town": "永康區",
    //   "Travellinginfo": "",
    //   "Opentime": "",
    //   "Picture1": "",
    //   "Picdescribe1": "",
    //   "Picture2": "",
    //   "Picdescribe2": "",
    //   "Picture3": "",
    //   "Picdescribe3": "",
    //   "Map": "",
    //   "Gov": "313020000G",
    //   "Px": 120.275724,
    //   "Py": 23.045063,
    //   "Orgclass": "觀光工廠",
    //   "Class1": "1",
    //   "Class2": "14",
    //   "Class3": "",
    //   "Level": "9",
    //   "Website": "",
    //   "Parkinginfo": "",
    //   "Parkinginfo_Px": 120.275724,
    //   "Parkinginfo_Py": 23.045063,
    //   "Ticketinfo": "收費方式請電洽",
    //   "Remarks": "詳細參觀訊息請逕洽廠商網站說明",
    //   "Keyword": "台南，志鋼，金屬，觀光工廠",
    //   "Changetime": "2013-07-13T15:00:00+08:00"
    // },
    // {
    //   "id": 3,
    //   "Id": "C1_313020000G_000136",
    //   "Name": "臺灣菸酒(股)公司林口觀光酒廠",
    //   "Zone": "",
    //   "Toldescribe": "林口酒廠為擁有近百年歷史的台北酒廠(1921)、板橋酒廠(1937)、樹林酒廠(1906)合併而成的新酒廠，於民國76年春正式啟用量產。原三酒廠各具有不同產品與文化特色，合併後發展為北部地區產能最大、設備最現代化的米糧釀造酒生產工廠。 林口酒廠成立以來一直是以生產紹興酒為主，民國85年利用原紹興酒生產設備釀製日式清酒，成功推出「玉泉清酒」，為全國唯一生產日式清酒之酒廠。民國93年為解決清酒粕副產物問題，開發「台酒清酒粕面膜」產品，定位為天然護膚保養素材，盛況一時，被喻為「窮人的SKII」。民國94年再創新研發，結合東方紅麴與西方葡萄酒，推出具養生概念且適合台灣人口味的「玉泉紅麴葡萄酒」，深獲社會大眾喜愛，為台灣市佔率最高的葡萄酒品牌。 林口酒廠不但致力各項酒類研發，生產方式也變得更加多元。民國96年將釀酒紅麴與餅乾大廠合作開發「台酒紅麴養生薄餅」，風味獨特造成搶購熱潮，風行海內外，短短1年半內創造超過10億元營業額，成為餅乾界之奇蹟。為朝多角化經營，除從事酒品生產外並設置有展售中心，內設「清酒館」「紅麴館」「酒銀行」等製程展館，開放民眾或外來觀光客參觀，一方面讓參訪者可了解製酒的過程與歷史，一方面也促使林口酒廠與工業區內其他景點(如台塑文物館、竹林寺、台塑醫療園區、華亞科技園區等)以及鄰近之鶯歌鎮產業等連結，形成地方產業文化觀光特色主題，除帶動產業觀光，更提昇桃園縣觀光旅遊系統的豐富性。 林口酒廠為配合公司資產活化政策，結合桃園縣推展航空城計畫以及機場捷運線開通啟用，集酒類生產、產業歷史、市場地利等基礎，結合產業文化、創意藝術、人文等資源以塑造工廠公園化，打造清酒意象文化園區，串聯週邊城廓、名勝、景點及公共設施，建構成北部地區指標性之觀光酒廠，期能吸引北臺灣800萬人口，來廠觀光遊憩進而增裕營收。",
    //   "Description": "林口酒廠為北部地區產能最大、設備最現代化的清酒、紅麴葡萄酒生產工廠。廠內有產品推廣中心，開放參觀製酒過程與歷史，與桃園其他景點連結地方文化特色主題，帶動觀光提昇旅遊的豐富性。",
    //   "Tel": "886-3-3283001#430",
    //   "Add": "桃園縣龜山鄉文化一路55號",
    //   "Zipcode": "333",
    //   "Region": "桃園市",
    //   "Town": "龜山區",
    //   "Travellinginfo": "",
    //   "Opentime": "",
    //   "Picture1": "",
    //   "Picdescribe1": "",
    //   "Picture2": "",
    //   "Picdescribe2": "",
    //   "Picture3": "",
    //   "Picdescribe3": "",
    //   "Map": "",
    //   "Gov": "313020000G",
    //   "Px": 121.375231,
    //   "Py": 25.056168,
    //   "Orgclass": "觀光工廠",
    //   "Class1": "1",
    //   "Class2": "14",
    //   "Class3": "",
    //   "Level": "9",
    //   "Website": "http://event.ttl-eshop.com.tw/lk/",
    //   "Parkinginfo": "",
    //   "Parkinginfo_Px": 121.375231,
    //   "Parkinginfo_Py": 25.056168,
    //   "Ticketinfo": "收費方式請電洽",
    //   "Remarks": "詳細參觀訊息請逕洽廠商網站說明",
    //   "Keyword": "林口，菸酒，酒廠，觀光工廠",
    //   "Changetime": "2013-07-13T15:00:00+08:00"
    // },
    // {
    //   "id": 4,
    //   "Id": "C1_315080500H_000007",
    //   "Name": "水璉、牛山海岸",
    //   "Zone": "",
    //   "Toldescribe": "水璉位在花蓮縣壽豐鄉海濱，蒼翠的山丘環抱著寬廣的河谷盆地，水璉溪蜿蜒而過，沿著公路邊的小徑往下，水璉濕地牛山海岸彷彿一片臨海的秘密樂園。除了可以踏浪戲水、進行沙灘活動和悠閒的垂釣之外，這片海岸的生態資源也相當豐富，海岸植物林是觀察東海岸生態樣貌的好地點，健行、漫步、賞鳥、觀蝶都是很棒的選擇，徜徉在廣闊的海岸草坪上感受藍天，白雲和陽光，時間彷彿定格。 牛山呼庭的由來座落在水璉南方海灘的牛山，阿美族叫做：Huting（呼庭），意思為大片草地的牧場。牛山擁有特殊地形，最奇特的是南岸貌似梯田的山丘小階，曾是水牛的牧草區，春天滿山坡的台灣百合盛開，可謂野百合的原生勝地。牛山的植物群相豐富，幾乎是東部海岸植物相的縮影，西元1990年（民國79年）已列入台灣沿海保護區計畫中之自然保護區。冬天水璉牛山的海灘會唱歌-換膚海灘春夏，海灘柔細溫潤，赤足漫步在沙灘上，海風徐徐吹拂，彷彿置身「海角一樂園」，閒適自在悠遊自得；當東北季風一起，長長的沙灘，幾番吹送，細沙變成大大小小五顏六色的鵝卵石，依著一定的秩序排列在海灘上，海浪翻湧而來，鵝卵石被推著往岸上跑；當海浪退去，它們順著海灘的斜度，一顆顆滾下，發出高低抑揚不同頻率的聲音，當地人稱：冬天水璉牛山的海灘會唱歌。把心留在海岸線-星光露營牛山這裡也有小木屋提供簡單住宿，也可以選擇露營。躺在星空之下，在眼底刻滿星光，聽著潮水的聲音入眠，一不小心連心都會遺留在海岸線了。",
    //   "Description": "水璉位在花蓮縣壽豐鄉海濱，為阿美族世居之地，早在3,500年前即有繩紋陶文化之先民居住於此。而座落在水璉南方海灘的牛山，阿美族稱此地為Hudin(呼定)，意即大片草地的牧場，此地植物群相豐富，幾乎是東部海岸植物相的縮影，已被劃定為自然生態保護區，綿延數公里的沙灘細緻溫潤，更是絕佳美景，彷彿一片臨海的秘密樂園。",
    //   "Tel": "886-3-8601400",
    //   "Add": "花蓮縣974壽豐鄉牛山39之5號",
    //   "Zipcode": "974",
    //   "Region": "花蓮縣",
    //   "Town": "壽豐鄉",
    //   "Travellinginfo": "南下：於花蓮火車站前的花蓮客運，搭乘往豐濱、成功方向的海線班車，經花蓮大橋，約40～50分鐘，即可抵達水璉。北上：自台東火車站前，搭乘往花蓮方向的海線班車，經磯崎後、芭崎、蕃薯寮後，在水璉下車。詳細時刻表及車資請洽花蓮客運(查詢電話：03-8338146~8)或鼎東客運海線(查詢電話：089-328629 / 089-333443)",
    //   "Opentime": "每日10:00-18:00",
    //   "Picture1": "https://www.eastcoast-nsa.gov.tw/image/40/640x480",
    //   "Picdescribe1": "當整個東海岸被層層的消坡塊鎖住時，綿延兩公里長的水璉牛山，卻散發出難能可貴的自然光采",
    //   "Picture2": "",
    //   "Picdescribe2": "",
    //   "Picture3": "",
    //   "Picdescribe3": "",
    //   "Map": "",
    //   "Gov": "315080500H",
    //   "Px": 121.569400,
    //   "Py": 23.763440,
    //   "Orgclass": "",
    //   "Class1": "8",
    //   "Class2": "",
    //   "Class3": "",
    //   "Level": "",
    //   "Website": "",
    //   "Parkinginfo": "",
    //   "Parkinginfo_Px": null,
    //   "Parkinginfo_Py": null,
    //   "Ticketinfo": "牛山呼庭園區需付50元門票，可抵用飲品。",
    //   "Remarks": "東海岸的石頭雖美，但請切勿撿取。走米棧古道，記得帶瓶水解渴。",
    //   "Keyword": "",
    //   "Changetime": "2021-11-04T11:31:29+08:00"
    // },
    // {
    //   "id": 5,
    //   "Id": "C1_315080500H_000012",
    //   "Name": "石梯坪",
    //   "Zone": "",
    //   "Toldescribe": "石梯坪擁有經風力和海水雕刻而成的特殊岩岸風景，潮間帶上豐富的自然生態資源：螃蟹、海星、海參、寄居蟹、色彩斑斕的魚群，等待觀察力敏銳的人來一探奧秘。夜晚在海蝕平台上方的石梯坪露營區搭營，隔天就能在營帳前迎接美麗的晨曦，看清晨的陽光破雲而出將海面映照得金黃燦爛。世界級的戶外地質教室石梯坪位在花蓮縣豐濱鄉石梯灣的南側尾端，整個區域是一個面積極大的海岸階地，海蝕地形十分發達，海蝕平台、隆起珊瑚礁、海蝕溝、海蝕崖等舉目皆是，尤其是壺穴景觀堪稱台灣第一。石梯坪海岸蘊藏著豐富的珊瑚礁群和熱帶魚群，潮間帶上與壺穴形成的潮池，生長著各式各樣的海藻、魚蝦、貝類等海洋生物，使石梯坪成為觀察潮間帶豐富生態和潛水、磯釣的絕佳場所。遊客可沿著風景區的環狀步道實地觀察，或是登上17公尺高的單面山，不僅可飽覽石梯坪的地質景觀，太平洋的壯闊浩瀚景象也能盡入眼底。來生態賞鯨吧石梯坪也是個充滿生命力的港口，漁船每日捕撈新鮮的漁獲上岸外，這裡也是台灣賞鯨的發源地，每年夏天鯨豚們總現身外海，吸引遊人們搭上賞鯨船追逐牠們優雅的身影，不妨搭上船一同來個生態賞鯨之旅吧！ 【石梯坪露營區】電話：0922-211336 呂先生網站：http://camping33.pgo.tw/相關資訊：點我",
    //   "Description": "石梯坪位在花蓮縣豐濱鄉石梯灣的南側，整個區域是一個面積極大的海岸階地，海蝕地形十分發達，海蝕平台、隆起珊瑚礁、海蝕溝、海蝕崖等比比皆是，尤其是壺穴景觀更是堪稱台灣第一。遊客可在此在此觀察潮間帶豐富生態或從事潛水活動，亦可選擇在設備完善的露營區夜宿。石梯坪主要族群是阿美族，夏天的捕魚祭和豐年祭為此處的主要活動，此處同時也是台灣賞鯨的發源地。【石梯坪工作站】電話：03-8781452   【石梯坪露營區】電話：03-8781599",
    //   "Tel": "886-3-8781452",
    //   "Add": "花蓮縣977豐濱鄉石梯坪52號",
    //   "Zipcode": "977",
    //   "Region": "花蓮縣",
    //   "Town": "豐濱鄉",
    //   "Travellinginfo": "南下：由花蓮火車站前搭往成功、靜浦或台東等地的花蓮、鼎東客運海線班車，在石梯坪下車。 北上：由台東火車站前搭往花蓮的鼎東、花蓮客運海線班車，在石梯坪下車。 詳細時刻表及車資請洽花蓮客運(查詢電話：03-8338146~8 )或鼎東客運海線(查詢電話：089-328629 / 089-333443)",
    //   "Opentime": "全天候開放露營電話預約時間：09:00~18:00電話：0922-211336 呂先生",
    //   "Picture1": "https://www.eastcoast-nsa.gov.tw/image/28701/640x480",
    //   "Picdescribe1": "宛如鬼斧神工般的石梯坪海蝕地形",
    //   "Picture2": "",
    //   "Picdescribe2": "",
    //   "Picture3": "",
    //   "Picdescribe3": "",
    //   "Map": "",
    //   "Gov": "315080500H",
    //   "Px": 121.511730,
    //   "Py": 23.485250,
    //   "Orgclass": "",
    //   "Class1": "8",
    //   "Class2": "",
    //   "Class3": "",
    //   "Level": "",
    //   "Website": "",
    //   "Parkinginfo": "",
    //   "Parkinginfo_Px": null,
    //   "Parkinginfo_Py": null,
    //   "Ticketinfo": "大型車：假日200元、非假日170元小型車：假日60元、非假日50元機車：假日20元、非假日15元",
    //   "Remarks": "1.石梯坪沒有遮陽設施，海邊日照強，要做好防曬；裝備也要齊全，除了遮陽的帽子、長褲、長袖，解渴的開水更不可少。2.初次造訪，建議沿木棧道前行，從第一座木造涼亭旁的石板步道下去，約2...",
    //   "Keyword": "",
    //   "Changetime": "2022-07-08T13:41:26+08:00"
    // },
    // {
    //   "id": 6,
    //   "Id": "C1_315080500H_000014",
    //   "Name": "長虹橋",
    //   "Zone": "",
    //   "Toldescribe": "長虹橋優雅的拱形橋身橫跨在秀姑巒溪出海口處兩岸，在山海交際之處形成一道美麗的虹影，成為東海岸的著名拍照地標，而這裡也是泛舟的終點站，一艘艘疲倦又滿足的泛舟筏在這裡靠岸。沿著步道在溪畔漫步，水鳥輕巧的在河床邊覓食，自行車來來往往，兩旁的植物隨季節變換風景，若是累了，不妨到附近的新太平洋1號店稍作休息，喝杯下午茶，度過悠閒的時光。出海口的奚卜蘭島，又稱作獅球嶼，綠意蒼蒼的小島是當地海岸阿美族的聖地，也是火山集塊岩構成的島嶼，由於溪流阻隔，保有相當天然的生態相貌，在河口覓食的鳥類、洄游魚類和蝦蟹都會在此聚集，是做生態觀察的好地點。",
    //   "Description": "長虹橋橫跨秀姑巒溪，連接靜浦與港口兩聚落，亦是秀姑巒溪泛舟的終點站；橋分新舊兩座橋，新橋採鮮艷亮眼的橙紅色，橋面規劃有快慢車道分隔的腳踏車及人行專用步道，並配合泛舟活動，設置了八座觀景台；橋上可遠眺出海囗的奚卜蘭島，因登島不易，島上仍維持原始林樣貌，俯瞰河面可見許多潔白如玉的大岩塊，其為巨型石灰岩，因其石潔白如玉，因而得到了「秀姑漱玉」的美名。",
    //   "Tel": "886-3-8671326",
    //   "Add": "花蓮縣977豐濱鄉台11線68公里處",
    //   "Zipcode": "977",
    //   "Region": "花蓮縣",
    //   "Town": "豐濱鄉",
    //   "Travellinginfo": "南下：由花蓮火車站前搭往成功、靜浦或台東等地的花蓮、鼎東客運海線班車，在長虹橋站下車，再依指標前往即可抵達。北上：由台東火車站前搭往花蓮的鼎東、花蓮客運海線班車，在長虹橋站下車，再依指標前往即可抵達。詳細時刻表及車資請洽花蓮客運(查詢電話：03-8338146~8 / 花蓮汽車客運公司)",
    //   "Opentime": "全天候開放",
    //   "Picture1": "https://www.eastcoast-nsa.gov.tw/image/28957/640x480",
    //   "Picdescribe1": "橫跨秀姑巒溪，連接靜浦與港口兩聚落的新長虹橋",
    //   "Picture2": "",
    //   "Picdescribe2": "",
    //   "Picture3": "",
    //   "Picdescribe3": "",
    //   "Map": "",
    //   "Gov": "315080500H",
    //   "Px": 121.489040,
    //   "Py": 23.468450,
    //   "Orgclass": "",
    //   "Class1": "8",
    //   "Class2": "",
    //   "Class3": "",
    //   "Level": "",
    //   "Website": "",
    //   "Parkinginfo": "",
    //   "Parkinginfo_Px": null,
    //   "Parkinginfo_Py": null,
    //   "Ticketinfo": "免費",
    //   "Remarks": "",
    //   "Keyword": "",
    //   "Changetime": "2021-11-04T11:31:29+08:00"
    // }]));
  }, [])

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
    onPageNumUpdate();
  }, [pageNum])

  function init(): void {
    if (attractions && attractions.length > 0) {
      setAttractions(attractions);
      return;
    }
    fetchAttractions();
  }

  /**
   * 當往下滑到底的時候撈新的10筆
   */
  function onPageNumUpdate(): void {
    // if (pageNum === 0) {
    //   return;
    // }
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
    console.log("search");
    dispatch(setAttractions([]));
    dispatch(resetPageNum());
    // dispatch(incrementPageNum());
    fetchAttractions(true);
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