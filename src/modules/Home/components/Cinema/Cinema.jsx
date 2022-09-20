import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { Tabs } from "antd";
import moment from "moment";
import { Box, Container, Group, Button, Text } from "@mantine/core";
import "./Cinema.scss";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Cinema = () => {
  const navigate = useNavigate();
  const { data: cinemas } = useRequest(() => movieAPI.getTheaterShowtime());
  const { user, isLoading } = useSelector((state) => state.auth);

  const gotoTicketCinema = async (purchaseId) => {
    if (user) {
      navigate(`/purchase/${purchaseId}`);
    } else {
      await swal({
        title: "Vui lòng đăng nhập",
        text: "Trước khi đặt vé. Cảm ơn!",
        icon: "warning",
        buttons: [0, true],
        dangerMode: true,
      });
      navigate("/login");
    }
  };
  return (
    <Container size="lg" id="Cinema">
      <Box
        sx={(theme) => ({
          margin: "60px 0",
          border: "1px solid #fff",
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            display: "none",
          },
        })}
      >
        <Group>
          <Tabs defaultActiveKe="1" tabPosition="left">
            {cinemas?.map((cinema, idx) => {
              return (
                <Tabs.TabPane
                  className="brands"
                  key={idx}
                  tab={
                    <img
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      src={cinema.logo}
                      alt=""
                    />
                  }
                >
                  <Tabs
                    defaultActiveKe="1"
                    sx={{ width: "600px" }}
                    className="tabMain2"
                    tabPosition="left"
                  >
                    {cinema?.lstCumRap.map((lst, idx) => {
                      return (
                        <Tabs.TabPane
                          key={idx}
                          tab={
                            <div className="tabPane2">
                              <h5 className="h5">
                                {lst.tenCumRap.length > 20
                                  ? lst.tenCumRap.substring(0, 20) + "..."
                                  : lst.tenCumRap}
                              </h5>
                              <span className="address">
                                {lst.diaChi.length > 30
                                  ? lst.diaChi.substring(0, 30) + "..."
                                  : lst.diaChi}
                              </span>
                              <span className="details">[Chi tiết]</span>
                            </div>
                          }
                        >
                          <div className="tabMain3" tabPosition="left ">
                            {lst.danhSachPhim?.map((danhSach, idx) => {
                              return (
                                <div key={idx} className="tabItem3">
                                  <div className="imgMovie">
                                    <img
                                      className="img"
                                      src={danhSach.hinhAnh}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div className="nameMovie">
                                      <Button radius="md" className="Button">
                                        C27
                                      </Button>
                                      <h5 className="h5">{danhSach.tenPhim}</h5>
                                    </div>
                                    <Group>
                                      {danhSach.lstLichChieuTheoPhim
                                        ?.slice(0, 4)
                                        .map((lstLichChieu, idx) => {
                                          return (
                                            <div>
                                              <Button
                                                radius="sm"
                                                className="dayButton"
                                                key={idx}
                                                onClick={() =>
                                                  gotoTicketCinema(
                                                    lstLichChieu.maLichChieu
                                                  )
                                                }
                                              >
                                                <Text
                                                  sx={(theme) => ({
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    color: "#000",
                                                  })}
                                                >
                                                  {moment(
                                                    lstLichChieu.ngayChieuGioChieu
                                                  ).format(
                                                    ` DD-MM-YYYY ~ hh:mm A `
                                                  )}
                                                </Text>
                                              </Button>
                                            </div>
                                          );
                                        })}
                                    </Group>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Tabs.TabPane>
                      );
                    })}
                  </Tabs>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </Group>
      </Box>
    </Container>
  );
};

export default Cinema;
