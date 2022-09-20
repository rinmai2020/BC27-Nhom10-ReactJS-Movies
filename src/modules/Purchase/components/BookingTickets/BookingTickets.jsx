import React, { Fragment } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import "./bookingTickets.scss";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector } from "react-redux";

const BookingTickets = ({ tickets, handleBooking, listSeat }) => {
  const mobileSize = useMediaQuery("(max-width: 576px)");
  const { user } = useSelector((state) => state.auth);
  const renderSeats = () => {
    return tickets?.danhSachGhe?.map((seat, index) => {
      let seatVip = seat.loaiGhe === "Vip" ? "seatVip" : "";
      let seatBooked = seat.daDat === true ? "seatBooked" : "";
      let seatAreBooked = "";
      let indexSeat = listSeat.findIndex(
        (seatBook) => seatBook.maGhe === seat.maGhe
      );
      let mySeat = "";
      if (user.taiKhoan === seat.taiKhoanNguoiDat) {
        mySeat = "mySeat";
      }
      if (indexSeat !== -1) {
        seatAreBooked = "seatAreBooked";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => handleBooking(seat)}
            disabled={seat.daDat}
            className={` seat ${seatVip} ${seatBooked} ${seatAreBooked} ${mySeat} `}
          >
            {seat.daDat ? (
              <AiOutlineClose
                style={{ color: "#fff", fontSize: "18px", fontWeight: 400 }}
              />
            ) : (
              seat.stt
            )}
          </button>
          {/* {mobileSize && <>{(index + 1) % 4 === 0 ? <br /> : ""}</>} */}
          {/* {mobileSize && <>{(index + 1) % 8 === 0 ? <br /> : ""}</>} */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <>
      <div className="screen">
        <h2 className="textsCreen">Let book your ticket</h2>
        <div style={{ background: "#15aabf", height: 20, width: "100%" }}></div>
        <div className="trapezoid"></div>
        <div>{renderSeats()}</div>
      </div>

      <div
        style={{ height: "100vh" }}
        className="mt-3 d-flex justify-content-center"
      >
        <table class=" table table-borderless">
          <thead className="text-white ">
            <tr>
              <th scope="col">Ghế chưa đặt</th>
              <th scope="col">Ghế đang đặt</th>
              <th scope="col">Ghế đã đặt</th>
              <th scope="col">Ghế vip</th>
              <th scope="col">Ghế mình đặt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <button className="seat text-center">
                  <AiOutlineCheck />
                </button>
              </th>
              <th>
                <button className="seat seatAreBooked  text-center">
                  <AiOutlineCheck />
                </button>
              </th>
              <th>
                <button className="seat seatBooked   text-center">
                  <AiOutlineCheck />
                </button>
              </th>
              <th>
                <button className="seat seatVip text-center">
                  <AiOutlineCheck />
                </button>
              </th>
              <th>
                <button className="seat mySeat text-center">
                  <AiOutlineCheck />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingTickets;
