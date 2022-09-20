import { Form, Input, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { Text, Button } from "@mantine/core";
import swal from "sweetalert";
const Login = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      await swal("Đăng Nhập Thành Công!", "You clicked the 'OK'!", "success");

      navigate("/");
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error,
      });
    }
    setTimeout(() => {
      if (user) {
        return <Navigate to="/" />;
      }
    }, 300);
  };

  // Đã đăng nhập

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
        Login
      </Text>
      <Form
        style={{ width: 320 }}
        radius="sm"
        onFinish={handleSubmit(onSubmit)}
        wrapperCol={{ span: 24 }}
      >
        <Controller
          sx={(theme) => ({
            border: "1px solid #5FCCDB",
          })}
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

        <Controller
          name="matKhau"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Mật khẩu không được để trống",
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

        <Form.Item>
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            fullWidth
            sx={(theme) => ({
              transition: "all 0.5s ease",
              backgroundColor: "#5FCCDB",
              "&:hover": {
                backgroundColor: "#2AC9DE",
              },
            })}
          >
            Đăng Nhập
          </Button>
        </Form.Item>
        <hr style={{ border: "1px solid #5FCCDB" }} />
        <Form.Item>
          Bạn chưa có tài khoản?
          <NavLink style={{ color: "#5FCCDB" }} to="/register">
            {" "}
            Đăng kí
          </NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
