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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addMovie } from "../../slice/filmManagerSlice";
const AddMovie = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },

    onSubmit: async (values) => {
      try {
        await dispatch(addMovie(values));
        notification.success({
          message: "Thêm hình thành công",
        });
        navigate("/admin/films");
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
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");
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
  const handleChangeFile = (e) => {
    // Lấy file ra từ e, ko phải JSON mà formData
    let file = e.target.files[0];
    //useForm if(!file) return
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        setImgSrc(evt.target.result);
      };

      formik.setFieldValue("hinhAnh", file);
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
          <Input name="tenPhim" type="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            ntype="trailer"
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" type="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePiker} />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch name="dangChieu" onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch name="sapChieu" onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch name="hot" onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            minx={1}
            max={10}
            onChange={handleChangeInputNumber("danhGia")}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} />
          <img
            src={imgSrc}
            style={{ width: 200, height: 200, marginTop: 10 }}
            alt="..."
            accept="image/png, image/jpeg,image/gif,image/png"
          />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button type="submit">Thêm phim</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddMovie;
