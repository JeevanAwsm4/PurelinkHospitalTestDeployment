"use client";

import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import useApi from "@/hooks/useApi";
import { useUser } from "@/context/UserContext";
import { ICityComposition } from "@/interfaces/apiType";
import { API_ENDPOINTS } from "@/config/apiConfig";

export default function CityComposition() {
  const [data, setData] = useState<ICityComposition>({
    "A+": 0,
    "A-": 0,
    "AB+": 0,
    "AB-": 0,
    "B+": 0,
    "B-": 0,
    "O+": 0,
    "O-": 0,
  });
  const [name, setName] = useState("");
  const { request } = useApi();
  const { userData, isLogged } = useUser();

  React.useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const signal = controller.signal;
  
    const fetchData = async () => {
      try {
        const response = await request({
          API_ENDPOINT: API_ENDPOINTS.CITY_COMPOSITION,
          method: "GET",
          token: userData?.accessToken,
          signal, // Pass the signal to the request
        });
        if (response.ok) {
          setData(response.data);
          setName(response.data.name);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort(); // Cancel the API request on cleanup
    };
  }, [request, userData?.accessToken]);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";

    chart.responsive.enabled = true;
    chart.responsive.useDefault = false; // Custom responsiveness

    chart.data = [
      { type: "A+", value: data["A+"], color: am4core.color("#FFE0E6") },
      { type: "A-", value: data["A-"], color: am4core.color("#FFECD8") },
      { type: "AB+", value: data["AB+"], color: am4core.color("#B8DEF9") },
      { type: "AB-", value: data["AB-"], color: am4core.color("#B8DEF9") },
      { type: "B+", value: data["B+"], color: am4core.color("#B8DEF9") },
      { type: "B-", value: data["B-"], color: am4core.color("#ECCBD3") },
      { type: "O+", value: data["O+"], color: am4core.color("#DDF2F3") },
      { type: "O-", value: data["O-"], color: am4core.color("#EADFFF") },
    ];

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "type";
    series.slices.template.propertyFields.fill = "color";

    series.labels.template.fill = am4core.color("#333");
    series.labels.template.wrap = true;
    series.labels.template.textAlign = "middle";
    series.ticks.template.stroke = am4core.color("#000");
    series.ticks.template.strokeWidth = 2;

    // Responsive font size
    const updateLabelSize = () => {
      series.labels.template.fontSize = window.innerWidth < 768 ? 10 : 16;
    };
    updateLabelSize();
    window.addEventListener("resize", updateLabelSize);

    return () => {
      chart.dispose();
      window.removeEventListener("resize", updateLabelSize);
    };
  }, [data]);
  if (!isLogged) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-6 w-full h-auto">
      <div className="flex flex-col gap-1">
        <div className="text-[1.25rem] font-medium leading-[1.5] tracking-normal max-md:text-base">
          City Composition
        </div>
        <div className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-gray-500 max-md:text-xs">
          Signed in as{" "}
          <span className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-[#7464F0] max-md:text-xs">
            {name}
          </span>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-xl p-6 max-md:p-2">
        <div className="flex gap-1 items-end">
          <h2 className="text-[20px] leading-[30px] tracking-normal w-fit max-md:text-lg">
            Pie Chart
            <div className="bg-[#7464F0] h-1 mt-2 w-20 max-md:w-16"></div>
          </h2>
        </div>
        <div
          id="chartdiv"
          className="w-full min-h-[400px] md:min-h-[500px]"
        ></div>
      </div>
    </div>
  );
}
