import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

const wineData = require('./Wine-Data.json')

function App() {
  const [scatterOption, setScatterOption] = useState<any>({
    xAxis: {},
    yAxis: {},
    series: [
      {
        data: [
        ],
        type: 'scatter'
      }
    ]
  })
  const [chartOption, setChartOption] = useState<any>({
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar'
      }
    ]
  });

  useEffect(() => {
    let colorIntensity: any = [];
    let alcohol: Number[] = [];
    let malicAcid: Number[] = [];

    wineData.forEach((element: any) => {
      colorIntensity.push([element["Color intensity"], element["Hue"]])
      alcohol.push(element["Alcohol"])
      malicAcid.push(element["Malic Acid"])
    });

    setChartOption({
      ...chartOption,
      xAxis: {
        type: 'category',
        data: alcohol
      },
      series: [{ type: 'bar', data: alcohol }]
    })

    setScatterOption({
      ...scatterOption, series: [{
        scatterOption: 4,
        data: colorIntensity,
        type: 'scatter'
      }]
    })

  }, []);

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div className="w-50">
      <ReactEcharts option={scatterOption} />
    </div>
    <div className="w-50">
      <ReactEcharts option={chartOption} />
    </div>
  </div>;
}
export default App;