import { Controller, useForm } from "react-hook-form";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Input, notification, Select } from "antd";
import { Text, Button, Grid } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  getUsers,
  updateUser,
} from "modules/Admin/Users/slice/userManagementSlice";
import useRequest from "hooks/useRequest";
import userAPI from "apis/userAPI";
const EditUser = () => {
  let { id } = useParams();
  const { userInfo, isLoading } = useSelector((state) => state.user);
  console.log(userInfo);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: id,
      matKhau: userInfo?.matKhau,
      email: userInfo?.email,
      soDt: userInfo?.soDT,
      hoTen: userInfo?.hoTen,
      maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
      maNhom: "GP10",
    },
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeUser = (values) => {
    setValue("maLoaiNguoiDung", values);
  };
  // const handleChange = (values) => {
  //   setValue("soDt", values);
  // };
  const onSubmit = async (values) => {
    try {
      await dispatch(updateUser(values));
      notification.success({
        message: "Lưu người dùng thành công",
      });
      navigate("/admin/users");
    } catch (error) {
      notification.error({
        message: "Thêm user thất bại",
        description: error,
      });
    }
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
        Cập nhật người dùng
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
                    disabled="disabled"
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
              s
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
                    value="soDt"
                    {...field}
                  />
                </Form.Item>
              )}
            />
            <Form.Item label="Loại người dùng">
              <Select
                key={1}
                defaultValue={{
                  value: userInfo.maLoaiNguoiDung,
                  label: userInfo.maLoaiNguoiDung,
                }}
                onChange={handleChangeUser}
                placeholder="Loại người dùng"
              >
                <Select.Option value="QuanTri">Quản trị</Select.Option>
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
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
