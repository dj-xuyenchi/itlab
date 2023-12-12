import { useSelector } from "react-redux";
import * as echarts from 'echarts';

import { useEffect, useRef } from "react";
import { Col, Row } from "antd";
function SoSanhKhoangThoiGian({ title = "Tên biểu đồ", data = [{
    soLuong: 1,
    sanPhamChiTiet: {
        tenSanPham: ""
    }
}] }) {
    const arr = data.map((item) => {
        return {
            value: item.soLuong,
            name: item.sanPhamChiTiet.tenSanPham
        }
    })
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: 'So sánh với năm ngoái',
                subtext: '(Đơn vị: cái)',
                top: 'bottom',
                left: 'center'
            },
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', '2022', '2023'],
                    ['Tháng 1', 43.3, 85.8],
                    ['Tháng 2', 83.1, 73.4],
                    ['Tháng 3', 86.4, 65.2],
                    ['Tháng 4', 72.4, 53.9],
                    ['Tháng 5', 43.3, 85.8],
                    ['Tháng 6', 83.1, 73.4],
                    ['Tháng 7', 86.4, 65.2],
                    ['Tháng 8', 72.4, 53.9],
                    ['Tháng 9', 43.3, 85.8],
                    ['Tháng 10', 83.1, 73.4],
                    ['Tháng 11', 86.4, 65.2],
                    ['Tháng 12', 72.4, 53.2],
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }]
        };
        chart.setOption(option);
        // Đảm bảo rằng biểu đồ được tự động thay đổi kích thước khi cửa sổ trình duyệt thay đổi
        window.addEventListener('resize', () => {
            chart.resize();
        });

        // Xóa sự kiện khi component unmounted
        return () => {
            chart.dispose();
            window.removeEventListener('resize', () => {
                chart.resize();
            });
        };
    }, [data]);
    return (
        <>
            <div ref={chartRef} style={{ marginLeft: "10%", width: '80%', height: '600px' }} />
            <Row style={{
                marginBottom: "40px"
            }}>
                <Col span={24}>
                    <a href="">tải xuống báo cáo excel.</a>
                </Col>
            </Row>
        </>
    );
}

export default SoSanhKhoangThoiGian;
