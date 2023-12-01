export const modal = (profit) => {
    return `Đây là thống doanh thu theo 12 tháng của cửa hàng bán áo nam:
  1.chi  ${profit[0].von} thu ${profit[0].doanhThu} 
                                        2.chi ${profit[1].von} thu ${profit[1].doanhThu} 
                                        3.chi ${profit[2].von} thu ${profit[2].doanhThu} 
                                        4.chi ${profit[3].von} thu ${profit[3].doanhThu} 
                                        5.chi ${profit[4].von} thu ${profit[4].doanhThu} 
                                        6.chi ${profit[5].von} thu ${profit[5].doanhThu} 
                                        7.chi ${profit[6].von} thu ${profit[6].doanhThu} 
                                        8.chi ${profit[7].von} thu ${profit[7].doanhThu} 
                                        9.chi ${profit[8].von} thu ${profit[8].doanhThu} 
                                        10.chi ${profit[9].von} thu ${profit[9].doanhThu} 
                                        11.chi ${profit[10].von} thu ${profit[10].doanhThu} 
                                        12.chi ${profit[11].von} thu ${profit[11].doanhThu}
Dựa vào doanh số 12 tháng trên hãy tạo cho tôi 1 ví dụ về sự kiện giảm giá cho các tháng còn lại của năm 2024 theo dạng
const suKien = {
"tenSuKien": ...,
"ngayBatDau": DD/MM/YYYY,
"ngayKetThuc": DD/MM/YYYY,
"moTa": ...,
"giaTriGiam": ...
}
sau đó cho tôi biết lý do tại sao lại chọn khoảng thời gian trên và ý nghĩa của tên sự kiện.
`
}

export const cmr = (profit) => {
    return `đây là thống kê doanh thu theo 12 tháng của cửa hàng bán áo nam:
                                        1.chi  ${profit[0].von} thu ${profit[0].doanhThu} 
                                        2.chi ${profit[1].von} thu ${profit[1].doanhThu} 
                                        3.chi ${profit[2].von} thu ${profit[2].doanhThu} 
                                        4.chi ${profit[3].von} thu ${profit[3].doanhThu} 
                                        5.chi ${profit[4].von} thu ${profit[4].doanhThu} 
                                        6.chi ${profit[5].von} thu ${profit[5].doanhThu} 
                                        7.chi ${profit[6].von} thu ${profit[6].doanhThu} 
                                        8.chi ${profit[7].von} thu ${profit[7].doanhThu} 
                                        9.chi ${profit[8].von} thu ${profit[8].doanhThu} 
                                        10.chi ${profit[9].von} thu ${profit[9].doanhThu} 
                                        11.chi ${profit[10].von} thu ${profit[10].doanhThu} 
                                        12.chi ${profit[11].von} thu ${profit[11].doanhThu}
                                        Hãy đánh giá cho tôi về tiềm năng kinh doanh và tôi có nên tạo sự kiện giảm giá để kích cầu mua sắm không`
}

export const susMon = (mon) => {
    return `Đây là thống doanh số theo 12 tháng của cửa hàng bán áo nam:
1. vốn: 20000000, thu 24000000,lãi 4000000
2. vốn: 30000000, thu 44000000,lãi 1400000
3. vốn: 70000000, thu 79000000,lãi 9000000
4. vốn: 20000000, thu 24000000,lãi 4000000
5. vốn: 20000000, thu 24000000,lãi 4000000
6. vốn: 60000000, thu 94000000,lãi 34000000
7. vốn: 20000000, thu 24000000,lãi 4000000
8. vốn: 20000000, thu 24000000,lãi 4000000
9. vốn: 20000000, thu 24000000,lãi 4000000
10. vốn: 20000000, thu 24000000,lãi 4000000
11. vốn: 20000000, thu 24000000,lãi 4000000
12. vốn: 20000000, thu 2000000,lãi 0
Dựa vào doanh số 12 tháng trên hãy tạo cho tôi 1 ví dụ về sự kiện giảm giá cho tháng ${mon} theo dạng
const suKien = {
"tenSuKien": ...,
"ngayBatDau": DD/MM/YYYY,
"ngayKetThuc": DD/MM/YYYY,
"moTa": ...,
"giaTriGiam": ...
}
sau đó cho tôi biết lý do tại sao lại chọn khoảng thời gian trên và ý nghĩa của tên sự kiện. 
`
}

export const suKienTrongThang = (thang) => {
    return `
    Hãy liệt kê cho tôi các sự kiện có thể giảm giá áo nam trong tháng ${thang} theo dạng
    const suKien = [
    "tên sự kiện", "tên sự kiện",...
    ]
    `
}


export const taoSuKien = (suKien) => {
    return `
   Hãy tạo giúp tôi sự kiện giảm giá ${suKien} áo nam theo dạng
const suKien = {
"tenSuKien": ...,
"ngayBatDau": DD/MM/YYYY,
"ngayKetThuc": DD/MM/YYYY,
"moTa": ...,
"giaTriGiam": ...
}
    `
}