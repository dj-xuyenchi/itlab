

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
//oki
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
