import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Box,
  Title,
} from "@mantine/core";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tabs } from "antd";
import _ from "lodash";
import BookingTickets from "../components/BookingTickets";
import TicketsDetail from "../components/TicketsDetail";
import { useDispatch, useSelector } from "react-redux";
import { bookingHistory, getTickets } from "../slices/ticketSlices";
import moment from "moment";
import "./purchase.scss";
const Tickets = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [listSeat, setListSeat] = useState([]);
  const { data: tickets } = useRequest(() => movieAPI.getTickets(id));
  const handleBooking = (seat) => {
    const seatItem = listSeat.findIndex((item) => {
      return item.maGhe === seat.maGhe;
    });
    let newList = [...listSeat];
    if (seatItem !== -1) {
      newList = newList.filter((item) => item.maGhe !== seat.maGhe);
    } else {
      newList.push(seat);
    }
    setListSeat(newList);
  };
  useEffect(() => {
    dispatch(getTickets());
  }, []);
  return (
    <Container
      size="xl"
      sx={(theme) => ({
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {},
      })}
    >
      <Grid>
        <Grid.Col xl={8}>
          <BookingTickets
            id={id}
            handleBooking={handleBooking}
            tickets={tickets}
            listSeat={listSeat}
          />
        </Grid.Col>
        <Grid.Col xl={4}>
          <TicketsDetail listSeat={listSeat} tickets={tickets} id={id} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const PurChase = ({ user }) => (
  <div className="purchase">
    <Container size="xl">
      <Tabs style={{ color: "#15aabf" }} defaultActiveKey="1">
        <Tabs.TabPane tab="CHỌN GHẾ THANH TOÁN" key="1">
          <Tickets />
        </Tabs.TabPane>
        <Tabs.TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
          <ResultTicket />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  </div>
);
export default PurChase;

const ResultTicket = () => {
  const dispatch = useDispatch();
  const { managerUser } = useSelector((state) => state.ticket);
  // console.log("thoong tin nguoi dung ", managerUser);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(bookingHistory());
  }, []);
  const renderTicketItem = () => {
    return managerUser.thongTinDatVe?.map((ticketIfo, index) => {
      const seats = _.first(ticketIfo.danhSachGhe);
      return (
        <Grid.Col lg={3}>
          <Card shadow="sm" radius="sm" withBorder>
            <Card.Section>
              <Box
                sx={(theme) => ({
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: `4px solid ${theme.colors.cyan[5]}`,
                  overflow: "hidden",
                  marginTop: 20,
                })}
                mx="auto"
              >
                <Image src={ticketIfo.hinhAnh} height={160} alt="Norway" />
              </Box>
            </Card.Section>
            <Title className="text-center mt-2" order={2}>
              {ticketIfo.tenPhim || "..."}
            </Title>
            <Group className="scroll" mt="md" mb="xs">
              <Grid>
                <Grid.Col span={10}>
                  <Title order={5}>Ngày:</Title>
                  <Text>
                    {moment(ticketIfo.ngayDat).format("hh:mm A") || "--/--/--"}
                  </Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Title order={5}>Giờ:</Title>
                  <Text>
                    {moment(ticketIfo.ngayDat).format("DD/MM/YYYY") || "-:-"}
                  </Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={5}>Địa điểm:</Title>
                  <Text order={4}>{seats.tenHeThongRap}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Title order={5}>Cụm rạp: {seats.tenCumRap}</Title>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Title order={5}>Ghế:</Title>
                  <Text order={4}>
                    {ticketIfo.danhSachGhe.map((ghe, index) => {
                      return (
                        <span style={{ fontWeight: "400" }} key={index}>
                          {ghe.tenGhe}{" "}
                        </span>
                      );
                    })}
                  </Text>
                </Grid.Col>
              </Grid>
              <Grid></Grid>
              <Text></Text>
            </Group>
          </Card>
        </Grid.Col>
      );
    });
  };
  return (
    <div>
      <h1 className="styleH1">Lịch sử đặt vé</h1>
      <Grid>{renderTicketItem()}</Grid>
    </div>
  );
};
