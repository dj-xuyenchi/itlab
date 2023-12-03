


import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../language/selectLanguage";
import * as echarts from 'echarts';
import axios from 'axios';

import { useEffect, useRef, useState } from "react";

function BanhDonut() {
    const language = useSelector(selectLanguage);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchDataAndInitializeChart = async () => {
            try {
                const response = await axios.get("http://localhost:8089/api/thong-ke/thong-ke-thuoc-tinh");
                const data = response.data;
                setChartData(data);

                const chartElement = chartRef.current;
                if (chartElement) {
                    const chart = echarts.init(chartElement);

                    // Update the chart configuration with the fetched data
                    const option = {
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: '5%',
                            left: 'center'
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2
                                },
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: 40,
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    { value: data.taiKhoanMoiThang[0][0], name: 'Tài Khoản Mới Trong Tháng' },
                                    { value: data.soLuongBanDuoc, name: 'Số Lượng Bán Được' },
                                    { value: data.tongSoLuongNhanVien, name: 'Tổng Số Lượng Nhân Viên' },
                                    { value: data.TongSoLuongLoi, name: 'Tổng Số Lượng Lỗi' },
                                ]
                            }
                        ]
                    };

                    chart.setOption(option);
                } else {
                    console.error("chartRef.current is null or undefined");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataAndInitializeChart();

        // Cleanup function remains the same

    }, []); // Empty dependency array to run the effect only once

    return (
        <>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </>
    );
}

export default BanhDonut;
