import React, { Fragment, useEffect } from "react";
import { Input, notification, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Button } from "antd/lib/radio";
import { useNavigate } from "react-router-dom";
import {
  changeSearch,
  deleteUser,
  findUser,
  getUserInfo,
  getUsers,
  updateUser,
} from "./slice/userManagementSlice";
const { Search } = Input;
const Users = () => {
  // const onSearch = (value) => {
  //   dispatch(getUsers(value));
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, search } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const handleGetMovieDT = async (userId) => {
    await dispatch(getUserInfo(userId)).unwrap();
    navigate(`/admin/users/updateUser/${userId}`);
  };

  const handleDeleteMovie = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
      notification.success({
        message: "Xoá thành công",
      });
    } catch (error) {
      notification.error({
        message: "Xoá thất bại",
        description: error,
      });
    }
  };
  const handleSearch = (value) => {
    if (value === "") {
      return dispatch(getUsers());
    }
    return dispatch(findUser(value));
  };
  const handleAdd = () => {
    navigate("/admin/users/add");
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "",
      render: (text, user, index) => {
        return <Fragment>{index + 1}</Fragment>;
      },
      sortDirection: ["descend", "ascend"],
      width: "",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      width: "",
      // render: (text, user) => {
      //   return <div>{user?.taiKhoan}</div>;
      // },
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      width: "",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "",
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      width: "",
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Loại người dùng ",
      dataIndex: "maLoaiNguoiDung",
      width: "",
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      width: "",
      render: (text, user) => {
        return (
          <Fragment>
            <span
              key={1}
              style={{
                color: "#15aabf",
                cursor: "pointer",
                marginRight: 5,
                fontSize: "16px",
              }}
              onClick={() => handleGetMovieDT(user.taiKhoan)}
            >
              <AiOutlineEdit />
            </span>
            <span
              key={2}
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có muốn xoá phim này không?" + user.taiKhoan
                  )
                ) {
                  handleDeleteMovie(user.taiKhoan);
                }
              }}
              style={{
                color: "red",
                marginRight: 5,
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              <AiOutlineDelete />
            </span>
          </Fragment>
        );
      },
      sortDirection: ["descend", "ascend"],
    },
  ];
  const data = users;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h3>Quản lý người dùng</h3>
      <Button className="mb-3" onClick={() => handleAdd(users.taiKhoan)}>
        Thêm
      </Button>
      <Search
        className="mb-5"
        placeholder="Search...."
        allowClear
        size="large"
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taKhoan"}
      />
    </div>
  );
};

export default Users;
