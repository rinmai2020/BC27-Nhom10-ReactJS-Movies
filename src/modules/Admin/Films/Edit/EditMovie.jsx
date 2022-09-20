import { Button } from "@mantine/core";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateMovies } from "../../slice/filmManagerSlice";
const EditMovie = () => {
  const { movieInfo } = useSelector((state) => state.movie);
  console.log("movieInfo", movieInfo);
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");

  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: id,
      // maPhim: movieInfo.maPhim,
      tenPhim: movieInfo.tenPhim,
      trailer: movieInfo.trailer,
      moTa: movieInfo.moTa,
      ngayKhoiChieu: movieInfo.ngayKhoiChieu,
      dangChieu: movieInfo.dangChieu,
      sapChieu: movieInfo.sapChieu,
      hot: movieInfo.hot,
      danhGia: movieInfo.danhGia,
      hinhAnh: null,
    },

    onSubmit: async (values) => {
      console.log("cap nhat", values);
      try {
        await dispatch(updateMovies(values));
        notification.success({
          message: "Chỉnh sửa thành công",
        });
        navigate(`/admin/films`);
      } catch (error) {
        notification.error({
          message: "Đăng nhập thất bại",
          description: error,
        });
      }
    },
  });
  //thu vien antd
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //Format ngay
  const handleChangeDatePiker = (values) => {
    let ngayKhoiChieu = moment(values);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  //Trang thai
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  //Số sao
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = async (e) => {
    // Lấy file ra từ e, ko phải JSON mà formData
    let file = e.target.files[0];
    if (!file) return;
    //useForm if(!file) return
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        setImgSrc(evt.target.result);
      };
    }
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Phim">
          <Input
            name="tenPhim"
            type="tenPhim"
            value={formik.values.tenPhim}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            type="trailer"
            value={formik.values.trailer}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            type="moTa"
            value={formik.values.moTa}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            value={moment(formik.values.ngayKhoiChieu)}
            onChange={handleChangeDatePiker}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch
            name="dangChieu"
            value={formik.values.dangChieu}
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            name="sapChieu"
            checked={formik.values.sapChieu}
            onChange={handleChangeSwitch("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            name="hot"
            checked={formik.values.hot}
            onChange={handleChangeSwitch("hot")}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            minx={1}
            max={10}
            value={formik.values.danhGia}
            onChange={handleChangeInputNumber("danhGia")}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} />
          <img
            src={imgSrc === "" ? movieInfo?.hinhAnh : imgSrc}
            style={{ width: 200, height: 200, marginTop: 10 }}
            alt="..."
            accept="image/png, image/jpeg,image/gif,image/png"
          />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button type="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditMovie;
