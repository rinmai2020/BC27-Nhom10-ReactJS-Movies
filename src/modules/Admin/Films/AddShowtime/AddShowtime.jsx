import React, { useEffect } from "react";
import {
  Button,
  Form,
  DatePicker,
  InputNumber,
  Select,
  notification,
} from "antd";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheaterShowtime,
  getTheaterSystem,
  postBookingTicket,
} from "modules/Admin/slice/filmManagerSlice";
import moment from "moment";

const AddShowtime = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { theaters, theaterSystem, error } = useSelector(
    (state) => state.movie
  );
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("abc", values);
      try {
        await dispatch(postBookingTicket(values));
        console.log("abasdhfsjh");
        notification.success({
          message: "Tạo lịch thành công",
        });
        // navigate("/admin/films");
      } catch {
        notification.error({
          message: "Tạo lịch chiếu thất bại",
          description: error,
        });
      }
    },
  });

  const onChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values);
  };
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values ngay", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onOk = (values) => {
    console.log("abcd", values);
  };

  useEffect(() => {
    dispatch(getTheaterShowtime());
  }, []);
  const handleChangeHeThongRap = async (values) => {
    console.log(values);
    try {
      await dispatch(getTheaterSystem(values));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  // he thong rap
  const convertHTR = () => {
    return theaters?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };
  //cum rap
  const covertCumRap = () => {
    return theaterSystem?.map((cumRap, index) => {
      return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{ remember: true }}
      onSubmitCapture={formik.handleSubmit}
    >
      {" "}
      <h3>Tạo lịch chiếu</h3>
      <Form.Item label="Hệ thống rạp">
        <Select
          key={1}
          style={{
            width: "100%",
          }}
          options={convertHTR()}
          onChange={handleChangeHeThongRap}
          placeholder="Chọn hệ thống rạp"
        />
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Select
          style={{
            width: "100%",
          }}
          key={2}
          options={covertCumRap()}
          onChange={handleChangeCumRap}
          placeholder="Chọn cụm rạp"
        />
      </Form.Item>
      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker
          format="DD/MM/YYYY hh:mm:ss"
          showTime
          onChange={onChangeDate}
          onOk={onOk}
        />
      </Form.Item>
      <Form.Item label="Giá vé">
        <InputNumber defaultValue={0} onChange={onChangeInputNumber} />
      </Form.Item>
      <Form.Item label="Chức năng">
        <Button htmlType="submit">Tạo lịch chiếu</Button>
      </Form.Item>
    </Form>
  );
};

export default AddShowtime;
