import React from "react";
// MUI
import CardPopular from "../home_module/CardPopular";
import PopCourceTab from "../home_module/popCourceTab";
import axios from "axios";

// // FetchData
// export async function popularEventsFetchData (){
//   const res = await fetch("https://sadra-edu.com/api/classes/data");
//   const data = await res.json()
//   // if(!data){
//   //   throw new Error("error while fetching comment data")
//   // }
//   return data;
// }

// const fetchData = async () => {
//   const res = await axios.get("http://localhost:3001/api/classes/data");
//   if (!res) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res;
// };

function PopCource({ data }) {
  return (
    <>
      <PopCourceTab popularEvents={data} />
      {/* <Box
        sx={{
          minHeight: "602px",
          width: "100%",
          typography: "body1",
          direction: "rtl",
          mt: "6rem",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#4CA773" } }}
              onChange={handleChange}
            >
              {TabHeaders.map((item) => (
                <Tab
                  key={item.id}
                  sx={{ fontFamily: "Yekan,sans-serif" }}
                  label={item.title}
                  value={item.id.toString()}
                />
              ))}
            </TabList>
          </Box>
          {TabHeaders.map((Tab) => (
            <TabPanel key={Tab.id} value={Tab.id.toString()}>
              <div className="popCardEvent">
                {popularEvents
                  ?.filter((item) => item.category === Tab.title)
                  .slice(0, 3)
                  .map(
                    (item) =>
                      item.isShown === 1 && (
                        <CardPopular key={item.id} {...item} />
                      )
                  )}
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box> */}
    </>
  );
}

export default PopCource;
