import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { FiFilter } from "react-icons/fi";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
} from "@chakra-ui/react";
import { Col, InputNumber, Radio, Row, Slider, Space, Tag } from "antd";
import { Checkbox as ckr } from "antd";
import { useEffect, useState } from "react";
import { fixMoney } from "../../../../extensions/fixMoney";
import Tag1 from "../../../common/tag/Tag1";
import { useFilterStore } from "./useFilter";
function Filter() {
  const language = useSelector(selectLanguage);
  const [value, setValue] = useState(undefined);
  const [thuocTinh, setThuocTinh] = useState(undefined)
  async function layThuocTinh() {
    const data = await useFilterStore.actions.layThuocTinh();
    setThuocTinh(data.data)
  }

  const [checkedList, setCheckedList] = useState([]);
  useEffect(() => {
    layThuocTinh()
  }, [])
  const [searchParam, setSearchParam] = useState([]);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const formatter = (value) => {
    return fixMoney(value);
  };
  const [inputValue, setInputValue] = useState(1);
  const [inputValueSlider, setInputValueSlider] = useState(1);
  const onChangeSlider = (newValue) => {
    setInputValue(newValue);
  };
  const [option, setOption] = useState(undefined)

  return (
    <>
      <div className="filter-container">
        <div className="title">
          <span>{language.body.filter.title}</span>
          <div>
            <FiFilter />
          </div>
        </div>
        <div className="filter-item" style={{
          width: "100%"
        }}>
          <div
            style={{
              marginBottom: "8px",
              width: "100%"
            }}
          >

            {searchParam.map((item) => {
              return <Tag className="tag" color={"pink"} >{item.ten}</Tag>
            })}
            <Tag className="tag" color="purple" onClick={() => {
              setCheckedList([])
              setSearchParam([])
            }}>Xóa tất cả</Tag>
          </div>
          {thuocTinh && <Accordion allowMultiple allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.type.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <ckr.Group
                    value={checkedList}

                    options={thuocTinh.nhomSanPhamList.map((item) => {
                      return {
                        label: item.tenNhom,
                        value: item.id
                      }
                    })}
                    onChange={(e) => {
                      setCheckedList(e);
                      setOption({
                        ...option,
                        nhomSanPham: e
                      })
                      searchParam.push({
                        id: thuocTinh.nhomSanPhamList.find((item) => {
                          return item.id === e[e.length - 1]
                        })?.maLoai,
                        ten: thuocTinh.nhomSanPhamList.find((item) => {
                          return item.id === e[e.length - 1]
                        })?.tenNhom,
                      })
                      setSearchParam(searchParam)
                    }}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Chất liệu
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <ckr.Group
                    options={thuocTinh.chatLieuList.map((item) => {
                      return {
                        label: item.tenChatLieu,
                        value: item.id
                      }
                    })}
                    onChange={(e) => {
                      setOption({
                        ...option,
                        chatLieu: e
                      })
                      searchParam.push({
                        id: thuocTinh.chatLieuList.find((item) => {
                          return item.id === e[e.length - 1]
                        }).maChatLieu,
                        ten: thuocTinh.chatLieuList.find((item) => {
                          return item.id === e[e.length - 1]
                        }).tenChatLieu,
                      })
                      setSearchParam(searchParam)
                    }}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.size.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <ckr.Group
                    options={thuocTinh.kichThuocList.map((item) => {
                      return {
                        label: item.tenKichThuoc,
                        value: item.id
                      }
                    })}
                    onChange={(e) => {
                      setOption({
                        ...option,
                        kichThuoc: e
                      })
                      searchParam.push({
                        id: thuocTinh.kichThuocList.find((item) => {
                          return item.id === e[e.length - 1]
                        }).maKichThuoc,
                        ten: thuocTinh.kichThuocList.find((item) => {
                          return item.id === e[e.length - 1]
                        }).tenKichThuoc,
                      })
                      setSearchParam(searchParam)
                    }}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.color.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <ckr.Group
                    options={thuocTinh.mauSacList.map((item) => {
                      return {
                        label: item.tenMau,
                        value: item.id
                      }
                    })}
                    onChange={(e) => {
                      setOption({
                        ...option,
                        mauSac: e
                      })
                      searchParam.push({
                        id: thuocTinh.mauSacList.find((item) => {
                          return item.id === e[e.length - 1]
                        }).maMauSac,
                        ten: thuocTinh.mauSacList.find((item) => {
                          return item.id === e[e.length - 1]
                        }).tenMau,
                      })
                      setSearchParam(searchParam)
                    }}
                  />
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {language.body.filter.item.cost.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div
                  style={{
                    marginTop: "8px",
                    marginLeft: "8px",
                    width: "90%",
                  }}
                >
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      {language.body.filter.item.cost.option.map(
                        (item, index) => {
                          return (
                            <Radio value={item.type} key={index}>
                              {item.name}
                            </Radio>
                          );
                        }
                      )}
                    </Space>
                  </Radio.Group>
                  <Row>
                    <Col span={24}>
                      <Slider
                        range={{
                          draggableTrack: true,
                        }}
                        tooltip={{
                          formatter,
                        }}
                        min={100000}
                        max={10000000}
                        defaultValue={[500000, 2000000]}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ width: "100%" }}
                        value={onChangeSlider}
                        onChange={onChangeSlider}
                      />
                    </Col>
                    <Col
                      span={2}
                      className="d-flex align-items-center justify-content-center"
                    >
                      -
                    </Col>
                    <Col span={11}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ width: "100%" }}
                        value={onChangeSlider}
                        onChange={onChangeSlider}
                      />
                    </Col>
                  </Row>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>}
        </div>
      </div>
    </>
  );
}

export default Filter;
