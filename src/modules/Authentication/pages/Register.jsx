import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";
import { Controller, useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Input, notification } from "antd";
import { Text, Button } from "@mantine/core";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "modules/Admin/Users/slice/userManagementSlice";
const Register = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    mode: "onTouched",
  });
  const { data: handleRegister, isLoading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  );
  // console.log(handleRegister);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(handleRegister());
  // }, []);
  const onSubmit = async (values) => {
    try {
      await handleRegister(values);
      swal("Đăng Ký Thành Công!", "You clicked the 'OK'!", "success");
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Đăng ký thất bại",
        description: error,
      });
    }
  };
  return (
    <div>
      <Link style={{ display: "flex", justifyContent: "flex-end" }} to="/">
        <AiOutlineClose
          style={{
            color: "#5FCCDB",
            fontSize: "25px",
          }}
        />
      </Link>
      <Text
        align="center"
        size={25}
        weight={600}
        sx={(theme) => ({
          color: "#5FCCDB",
          marginBottom: "10px",
        })}
      >
        Register
      </Text>
      <Form
        style={{ width: 320 }}
        onFinish={handleSubmit(onSubmit)}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
      >
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
        {/* Email  */}
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
        {/* fullName  */}
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
        <Form.Item>
          <Button
            fullWidth
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
            block
          >
            Đăng Ký
          </Button>
        </Form.Item>
        <hr style={{ border: "1px solid #5FCCDB" }} />
        <Form.Item>
          Bạn đã có tài khoản?
          <NavLink style={{ color: "#5FCCDB" }} to="/login">
            {" "}
            Đăng nhập
          </NavLink>
          {/* <NavLink style={{ color: "#000" }} to="/">
            <FcNext />
            Home
          </NavLink> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
