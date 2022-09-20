import React, { useState } from "react";
import "./adminLayout.scss";
import { UserOutlined, AudioOutlined } from "@ant-design/icons";
import { BiMoviePlay } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, Space, Dropdown } from "antd";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "modules/Authentication/slices/authSlice";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/admin/users">Users</Link>, "1", <UserOutlined />, [
    // getItem(<Link to="">Users</Link>, "1", <UserOutlined />),
    getItem(<Link to="/admin/users/add">AddUser</Link>, "2", <UserOutlined />),
  ]),
  getItem(<Link to="/admin/films">Films</Link>, "2", <BiMoviePlay />, [
    // getItem(<Link to="films">Film</Link>, "1", <UserOutlined />),
    getItem(
      <Link to="/admin/films/add">AddFilm</Link>,
      "2",
      <UserOutlined style={{ color: "#fff" }} />
    ),
  ]),
];
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#000",
    }}
  />
);

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const onSearch = (value) => console.log(value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const menuItem =
    user?.maLoaiNguoiDung === "QuanTri"
      ? [
          {
            label: (
              <>
                <span
                  style={{
                    lineHeight: "25px",
                    marginRight: "10px",
                    color: "#fff",
                  }}
                >
                  <FiLogOut />
                </span>
                <a
                  style={{ fontWeight: "500", color: "#fff" }}
                  href="#"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </a>
              </>
            ),
            key: "3",
          },
        ]
      : "";
  const menu = <Menu items={menuItem} />;

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logoadmin">
          <h1>DR MOVIE</h1>
        </div>
        <Menu
          theme="cyan"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        {/* <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        ></Header> */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb> */}

          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <>
              {user && (
                <div className="logout">
                  <Avatar
                    style={{
                      color: "#fff",
                      border: "2px solid #15aabf",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "centers",
                    }}
                  >
                    <span className="name fs-5">A</span>
                  </Avatar>
                  <Link
                    style={{
                      color: "#15aabf",
                      fontWeight: 500,
                      fontSize: "18px",
                      margin: "0 20px 0 8px",
                    }}
                    to="/"
                  >
                    App
                  </Link>
                  <Avatar
                    style={{
                      color: "#fff",
                      border: "2px solid #15aabf",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "centers",
                    }}
                  >
                    <span className="name fs-5">G</span>
                  </Avatar>
                  <a
                    style={{
                      color: "#15aabf",
                      fontWeight: 500,
                      fontSize: "18px",
                      margin: "0 20px 0 8px",
                      // backgroundColor: "#",
                    }}
                    href="https://github.com/rinmai2020/project-movie"
                    target="_blank"
                  >
                    Github
                  </a>
                  <Avatar
                    style={{
                      color: "#fff",
                      backgroundColor: "#15aabf",
                    }}
                  >
                    {user.taiKhoan.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <p className="name">{user.taiKhoan}</p>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <DownOutlined
                          style={{ color: "#15aabf", fontSize: "18px" }}
                        />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              )}
            </>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
