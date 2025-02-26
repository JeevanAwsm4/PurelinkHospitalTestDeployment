"use client";

import { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default function CityComposition() {
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";

    chart.responsive.enabled = true;
    chart.responsive.useDefault = false; // Custom responsiveness

    chart.data = [
      { type: "A+", value: 10, color: am4core.color("#FFE0E6") },
      { type: "A-", value: 13, color: am4core.color("#FFECD8") },
      { type: "B+", value: 17, color: am4core.color("#B8DEF9") },
      { type: "B-", value: 28, color: am4core.color("#ECCBD3") },
      { type: "O+", value: 43, color: am4core.color("#DDF2F3") },
      { type: "O-", value: 43, color: am4core.color("#EADFFF") },
      { type: "AB+", value: 88, color: am4core.color("#E1F0FF") },
      { type: "AB-", value: 17, color: am4core.color("#FFF4DB") },
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
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full h-auto">
      <div className="flex flex-col gap-1">
        <div className="text-[1.25rem] font-medium leading-[1.5] tracking-normal max-md:text-base">
          City Composition
        </div>
        <div className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-gray-500 max-md:text-xs">
          Signed in as{" "}
          <span className="text-[0.875rem] font-normal leading-[1.43] tracking-normal text-[#7464F0] max-md:text-xs">
            Medicity Kollam
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
};

