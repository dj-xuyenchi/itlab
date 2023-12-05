// import { useSelector } from "react-redux";
// import { selectLanguage } from "../../../../language/selectLanguage";
// import * as echarts from 'echarts';

// import { useEffect, useRef } from "react";
// function ThongKeBar({ title = "Tên biểu đồ", subTitle = "fake-data", data = [{
//     von: 0,
//     doanhThu: 0
// }] }) {
//     const language = useSelector(selectLanguage);
//     const chartRef = useRef(null);
//     const von = data.map((item) => {
//         return item.von
//     })
//     const doanhThu = data.map((item) => {
//         return item.doanhThu
//     })
//     useEffect(() => {
//         const chart = echarts.init(chartRef.current);

//         // Định nghĩa dữ liệu và tùy chọn biểu đồ
//         const option = {
//             title: {
//                 text: title,
//                 subtext: subTitle
//             },
//             tooltip: {
//                 trigger: 'axis'
//             },
//             legend: {
//                 data: ['Chi', 'Thu']
//             },
//             toolbox: {
//                 show: true,
//                 feature: {
//                     dataView: { show: true, readOnly: false },
//                     magicType: { show: true, type: ['line', 'bar'] },
//                     restore: { show: true },
//                     saveAsImage: { show: true }
//                 }
//             },
//             calculable: true,
//             xAxis: [
//                 {
//                     type: 'category',
//                     // prettier-ignore
//                     data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
//                 }
//             ],
//             yAxis: [
//                 {
//                     type: 'value'
//                 }
//             ],
//             series: [
//                 {
//                     name: 'Chi',
//                     type: 'bar',
//                     data: von,
//                     markPoint: {
//                         data: [
//                             { type: 'max', name: 'Max' },
//                             { type: 'min', name: 'Min' }
//                         ]
//                     },
//                     markLine: {
//                         data: [{ type: 'average', name: 'Avg' }]
//                     }
//                 },
//                 {
//                     name: 'Thu',
//                     type: 'bar',
//                     data: doanhThu,
//                     markLine: {
//                         data: [{ type: 'average', name: 'Avg' }]
//                     }
//                 }
//             ]
//         }

//         chart.setOption(option);

//         // Đảm bảo rằng biểu đồ được tự động thay đổi kích thước khi cửa sổ trình duyệt thay đổi
//         window.addEventListener('resize', () => {
//             chart.resize();
//         });

//         // Xóa sự kiện khi component unmounted
//         return () => {
//             chart.dispose();
//             window.removeEventListener('resize', () => {
//                 chart.resize();
//             });
//         };
//     }, [data]);
//     return (
//         <>
//             <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
//         </>
//     );
// }

// export default ThongKeBar;

// ThongKeBar.jsx

import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import * as echarts from 'echarts';

function ThongKeBar({ title = "Tên biểu đồ", subTitle = "fake-data" }) {
    const chartRef = useRef(null);
    const [data, setData] = useState({
        doanhThuTheoThang: [],
        doanhThuTheoThangTruChiPhi: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('/api/thong-ke/bieu-do-tong-hop');
                const response = await axios.get('http://localhost:8089/api/thong-ke/bieu-do-tong-hop');

                const result = response.data;

                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!chartRef.current || loading || error) {
            return;
        }

        const chart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: title,
                subtext: subTitle
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Doanh thu', 'Doanh thu trừ chi phí']
            },
            xAxis: {
                type: 'category',
                data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Doanh thu',
                    type: 'bar',
                    data: data.doanhThuTheoThang.map(value => value || 0),
                },
                {
                    name: 'Doanh thu trừ chi phí',
                    type: 'bar',
                    data: data.doanhThuTheoThangTruChiPhi.map(value => value || 0),
                }
            ]
        };

        chart.setOption(option);

        window.addEventListener('resize', () => {
            chart.resize();
        });

        return () => {
            chart.dispose();
            window.removeEventListener('resize', () => {
                chart.resize();
            });
        };
    }, [data, loading, error, subTitle, title]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div ref={chartRef} style={{ width: '1200px', height: '400px' }} />
        </div>
    );
}

export default ThongKeBar;
