import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { Tabs } from "antd";
import { Container, Button, Group, Text, Box } from "@mantine/core";
import moment from "moment";
import { useNavigate } from "react-router";
import "./showtimes.scss";
import { useSelector } from "react-redux";
import CheckoutRoute from "routes/CheckoutRoute";
import swal from "sweetalert";
const Showtimes = ({ movieId }) => {
  const navigate = useNavigate();
  const { data: showtimes } = useRequest(() =>
    movieAPI.getMovieShowtime(movieId)
  );
  const { user, isLoading } = useSelector((state) => state.auth);
  if (!showtimes) {
    return null;
  }
  const gotoTicket = async (purchaseId) => {
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
    <Container id="Showtimes" size="lg">
      <Box
        sx={(theme) => ({
          margin: "60px 0",
        })}
      >
        <>
          <Tabs defaultActiveKe="1" tabPosition="left">
            {showtimes.heThongRapChieu?.map((showtime) => {
              return (
                <Tabs.TabPane
                  key={showtime.maHeThongRap}
                  tab={
                    <img
                      sx={(theme) => ({})}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      src={showtime.logo}
                      alt=""
                    />
                  }
                >
                  <div
                    className="tabMainTime"
                    defaultActiveKe="1"
                    tabPosition="left"
                  >
                    {showtime.cumRapChieu?.map((cumRap, idx) => {
                      return (
                        <Box className="tabItem">
                          <Group
                            sx={(theme) => ({
                              display: "inline-block",
                              marginLeft: "40px",
                              marginTop: "30px",

                              [`@media (max-width: ${theme.breakpoints.sm}px)`]:
                                {
                                  display: "block",
                                  marginLeft: "20px",
                                },
                            })}
                            key={cumRap.maRap}
                          >
                            <Text
                              sx={(theme) => ({
                                textAlign: "left",
                                height: 20,
                                lineHeight: "20px",
                                fontSize: 18,
                                fontWeight: 500,
                                margin: 0,
                                color: " #15aabf",
                                marginBottom: "10px",
                                [`@media (max-width: ${theme.breakpoints.sm}px)`]:
                                  { fontSize: 16, marginLeft: "0px" },
                              })}
                            >
                              {cumRap.tenCumRap}
                            </Text>
                            <Group>
                              {cumRap.lichChieuPhim
                                ?.slice(0, 4)
                                .map((lichChieu) => {
                                  return (
                                    <div>
                                      <Button
                                        radius="sm"
                                        className="dayButton"
                                        key={lichChieu.maRap}
                                        sx={(theme) => ({
                                          [`@media (max-width: ${theme.breakpoints.sm}px)`]:
                                            {
                                              display: "block",
                                              marginBottom: "10px",
                                            },
                                        })}
                                        onClick={() =>
                                          gotoTicket(lichChieu.maLichChieu)
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
                                            lichChieu.ngayChieuGioChieu
                                          ).format(` DD-MM-YYYY ~ hh:mm a `)}
                                        </Text>
                                      </Button>
                                    </div>
                                  );
                                })}
                            </Group>
                          </Group>
                        </Box>
                      );
                    })}
                  </div>
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </>
      </Box>
    </Container>
  );
};

export default Showtimes;
