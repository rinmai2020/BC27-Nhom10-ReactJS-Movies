import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";
import { Controller, useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Input, notification, Select } from "antd";
import { Text, Button, Grid } from "@mantine/core";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "modules/Admin/Users/slice/userManagementSlice";
import "./add.scss";
const Register = () => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung: "",
      maNhom: "GP10",
    },
    mode: "onTouched",
  });
  const { users, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      await dispatch(addUser(values));
      notification.success({
        message: "Thêm user thành công",
      });
      navigate("/admin/users");
    } catch (error) {
      notification.error({
        message: "Thêm user thất bại",
        description: error,
      });
    }
  };
  const handleChangeUser = (values) => {
    setValue("maLoaiNguoiDung", values);
  };

  return (
    <div>
      <Text
        align="center"
        size={25}
        weight={600}
        sx={(theme) => ({
          color: "#5FCCDB",
          marginBottom: "10px",
        })}
      >
        Thêm sách người dùng
      </Text>

      <Form
        // style={{ width: 320 }}
        onFinish={handleSubmit(onSubmit)}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Grid>
          <Grid.Col lg={6}>
            <Controller
              name="taiKhoan"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Tài khoản không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label="Tài khoản"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input
                    style={{ border: "1px solid #5FCCDB" }}
                    placeholder="Tài khoản"
                    type="text"
                    {...field}
                  />
                </Form.Item>
              )}
            />
            {/* password  */}
            <Controller
              name="matKhau"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                minLength: {
                  value: 5,
                  message: "Mật khẩu phải từ 5 đến 20 ký tự",
                },
                maxLength: {
                  value: 20,
                  message: "Mật khẩu phải từ 5 đến 20 ký tự",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label="Mật khẩu"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input.Password
                    style={{ border: "1px solid #5FCCDB" }}
                    placeholder="Mật khẩu"
                    type="password"
                    {...field}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="hoTen"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Họ tên không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label="Họ tên"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input
                    style={{ border: "1px solid #5FCCDB" }}
                    placeholder="Họ và tên"
                    type="text"
                    {...field}
                  />
                </Form.Item>
              )}
            />
          </Grid.Col>
          <Grid.Col lg={6}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email không được để trống",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email không đúng định dạng",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label="Email"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input
                    style={{ border: "1px solid #5FCCDB" }}
                    placeholder="Email"
                    type="text"
                    {...field}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="soDt"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Số điện thoại không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  label="Số DT"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input
                    style={{ border: "1px solid #5FCCDB" }}
                    placeholder="Số điện thoại"
                    type="text"
                    {...field}
                  />
                </Form.Item>
              )}
            />
            <Form.Item label="Loại người dùng">
              <Select
                key={1}
                onChange={handleChangeUser}
                placeholder="Loại người dùng"
              >
                <Select.Option
                  align="center"
                  size={25}
                  weight={600}
                  value="QuanTri"
                >
                  Quản trị
                </Select.Option>
                <Select.Option value="KhachHang">Khách hàng</Select.Option>
              </Select>
            </Form.Item>
          </Grid.Col>
        </Grid>

        {/* fullName  */}

        <Form.Item>
          <Button
            sx={(theme) => ({
              backgroundColor: "#5FCCDB",
              transition: "all 0.5s ease",
              "&:hover": {
                backgroundColor: "#2AC9DE",
              },
            })}
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
