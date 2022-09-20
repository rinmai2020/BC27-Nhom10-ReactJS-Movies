import React from "react";
import { ImLocation2 } from "react-icons/im";
import {
  Text,
  Box,
  Card,
  Group,
  Image,
  Space,
  Title,
  Grid,
  Divider,
  Badge,
  Button,
} from "@mantine/core";
import { TicketsInfo } from "modules/_core/ticketsInfo";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { bookingTickets } from "modules/Purchase/slices/ticketSlices";
import CheckoutRoute from "routes/CheckoutRoute";
const TicketsDetail = ({ tickets, listSeat, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleTicket = async (ticketInfo) => {
    try {
      await dispatch(bookingTickets(ticketInfo));
    } catch (error) {
      console.log(error);
    }
  };
  const renderPrice = () => {
    return (
      listSeat
        ?.reduce((total, item) => {
          return total + item.giaVe;
        }, 0)
        .toLocaleString() +
      " " +
      "VND"
    );
  };
  return (
    <Card
      radius="lg"
      sx={(theme) => ({
        backgroundColor: theme.colors.white,
        color: theme.colors.cyan,
        textAlign: "center",
        marginTop: 55,
      })}
    >
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: `4px solid ${theme.colors.cyan[5]}`,
            overflow: "hidden",
          })}
          mx="auto"
        >
          <img
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            src={tickets?.thongTinPhim?.hinhAnh}
            withPlaceholder
            alt={tickets?.thongTinPhim?.tenPhim}
          />
        </Box>
      </Box>
      <Space h={16} />
      <Title order={2}>{tickets?.thongTinPhim?.tenPhim || "..."}</Title>
      <Space h={16} />
      <Grid>
        <Grid.Col span={6}>
          <Title order={4}>Ngày:</Title>
          <Space h={8} />
          <Text> {tickets?.thongTinPhim?.ngayChieu || "--/--/--"}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Giờ:</Title>
          <Space h={8} />
          <Text>{tickets?.thongTinPhim?.gioChieu || "-:-"}</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Title order={4}>Cụm:</Title>
          <Space h={8} />
          <Text>{tickets?.thongTinPhim?.tenCumRap}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Rạp:</Title>
          <Space h={8} />
          <Text>{tickets?.thongTinPhim.tenRap || "-:-"}</Text>
        </Grid.Col>
      </Grid>
      <Space h={16} />
      <Text>
        <ImLocation2 />
        {tickets?.thongTinPhim.diaChi}
      </Text>
      <Space h={20} />

      <Divider
        sx={{
          position: "relative",
        }}
        size={"sm"}
        variant="dashed"
        label={
          <>
            <Box
              sx={(theme) => ({
                position: "absolute",
                left: -56,
                height: 56,
                width: 56,
                backgroundColor: theme.colors.cyan[7],
                borderRadius: "50%",
                zIndex: 100,
              })}
            />
            <Box
              sx={(theme) => ({
                position: "absolute",
                right: -56,
                height: 56,
                width: 56,
                backgroundColor: theme.colors.cyan[7],
                borderRadius: "50%",
                zIndex: 100,
              })}
            />
          </>
        }
      />
      <Space h={20} />
      <Group
        sx={(theme) => ({
          height: 60,
          color: theme.colors.cyan,
        })}
      >
        <Text
          sx={(theme) => ({
            color: theme.colors.cyan,
            fontWeight: 600,
            fontSize: 16,
          })}
        >
          Ghế:
        </Text>
        {listSeat?.map((seat) => (
          <Badge
            radius="sm"
            sx={(theme) => ({
              color: theme.colors.cyan,
              fontWeight: 400,
            })}
          >
            {seat.tenGhe}
          </Badge>
        ))}
      </Group>
      <Text
        sx={(theme) => ({
          fontSize: 35,
          fontWeight: 500,
          borderRadius: "4px",
          color: theme.colors.orange,
        })}
      >
        {renderPrice()}
      </Text>
      <Space h={15} />
      <Button
        onClick={() => {
          const ticketInfo = new TicketsInfo();
          ticketInfo.maLichChieu = id;
          ticketInfo.danhSachVe = listSeat;
          alert("Mua vé thành công");
          handleTicket(ticketInfo);
        }}
        radius="sm"
        color="cyan"
        fullWidth
      >
        Đặt vé
      </Button>
    </Card>
  );
};

export default TicketsDetail;
