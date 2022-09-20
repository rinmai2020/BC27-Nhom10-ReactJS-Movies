import React, { Fragment, useEffect } from "react";
import { Input, notification, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  getMovieDetails,
  getMovies,
  deleteMovies,
} from "../slice/filmManagerSlice";
import { Button } from "antd/lib/radio";
import { NavLink } from "react-router-dom";
const { Search } = Input;
const MovieList = () => {
  const onSearch = (value) => {
    dispatch(getMovies(value));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies } = useSelector((state) => state.movie);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getMovies());
  }, []);
  const handleGetMovieDT = (movieId) => {
    dispatch(getMovieDetails(movieId));
    navigate(`/admin/films/edit/${movieId}`);
  };
  const handleDeleteMovie = async (movieId, token) => {
    try {
      await dispatch(deleteMovies(movieId, token));
      console.log(movieId);
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
  const handleAdd = () => {
    navigate("/admin/films/add");
  };
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      width: "15%",
      sorter: (a, b) => b.maPhim - a.maPhim,
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      width: "15%",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `http://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: "20%",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      width: "25%",
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        if (moTaA > moTaB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      sortDirection: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      width: "25%",
      render: (text, film) => {
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
              onClick={() => handleGetMovieDT(film.maPhim)}
            >
              <AiOutlineEdit />
            </span>
            <span
              key={2}
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có muốn xoá phim này không?" + film.tenPhim
                  )
                ) {
                  handleDeleteMovie(film.maPhim, user.accesToken);
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
            <NavLink
              style={{ color: "green", cursor: "pointer", fontSize: "16px" }}
              to={`/admin/films/showtime/${film.maPhim}`}
            >
              <AiOutlineCalendar />
            </NavLink>
          </Fragment>
        );
      },
      sortDirection: ["descend", "ascend"],
    },
  ];
  const data = movies;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h3>Quản lý phim</h3>
      <Button className="mb-3" onClick={() => handleAdd(movies.maPhim)}>
        Thêm Phim
      </Button>
      <Search
        className="mb-5"
        placeholder="Search...."
        allowClear
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
};

export default MovieList;
