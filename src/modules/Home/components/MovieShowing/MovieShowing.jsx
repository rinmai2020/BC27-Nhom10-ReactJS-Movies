import { useNavigate } from "react-router-dom";
//swiper

// import { BsPlayCircle } from "react-icons/bs";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Container,
  Box,
  Modal,
  Pagination,
} from "@mantine/core";
import { useState } from "react";
const MovieShowing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data: movies } = useRequest(() => movieAPI.getMoviePages({ page }), {
    deps: [page],
  });
  const goToMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  const handleChange = (page) => {
    setPage(page);
  };
  return (
    <Container id="MovieShowing" size="lg">
      <Grid
        gutter={24}
        sx={(theme) => ({
          marginTop: "30px",
          height: "930px",
          [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            height: "100%",
            "&:hover": {
              transform: "unset",
            },
          },
        })}
      >
        {movies?.items.map((movie) => {
          return (
            <Grid.Col key={movie.maPhim} xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={(theme) => ({
                  transition: "all  0.3s ease",
                  cursor: "pointer",
                  margin: "5px ",

                  "&:hover": {
                    transform: "scale(105%)",
                  },
                  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                    "&:hover": {
                      transform: "unset",
                    },
                  },
                })}
              >
                <Card
                  shadow="sm"
                  radius="sm"
                  withBorder
                  sx={(theme) => ({
                    height: 280,
                    border: "1px solid cyan ",
                  })}

                  // radius="md"
                >
                  <Card.Section
                    sx={(theme) => ({
                      height: 280,
                    })}
                  >
                    <Image
                      fullWidth
                      height="100%"
                      width="100%"
                      fit="contain"
                      src={movie.hinhAnh}
                    />
                    <Modal
                      sx={(theme) => ({
                        height: "100%",
                        backgroundColor: "transparent",
                        color: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      })}
                      transitionDuration={100}
                      onClose={() => setIsModalOpen(false)}
                      opened={isModalOpen}
                      fullScreen
                      centered
                      closeOnEscape
                    >
                      <iframe
                        style={{
                          marginTop: "56px",
                          marginLeft: "auto",
                          marginRight: "auto",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "90%",
                        }}
                        src={movie?.trailer}
                        title={movie?.biDanh}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </Modal>
                  </Card.Section>
                </Card>
                <Group
                  sx={(theme) => ({
                    padding: "0 5px",
                    marginTop: 16,
                    color: "#fff",
                  })}
                >
                  <Group
                    position="apart"
                    sx={(theme) => ({
                      width: "100%",
                      alignItems: "flex-start",
                    })}
                  >
                    <Text
                      sx={{
                        textAlign: "left",
                        height: 20,
                        lineHeight: "20px",
                        fontSize: 18,
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {movie.tenPhim.length > 18
                        ? movie.tenPhim.substring(0, 18) + "..."
                        : movie.tenPhim}
                    </Text>

                    <Badge radius="sm" color="cyan">
                      C27
                    </Badge>
                  </Group>
                  <Text
                    sx={{ marginBottom: "4px" }}
                    align="left"
                    size="sm"
                    color="gray0"
                    lineClamp={2}
                  >
                    {movie.moTa.length > 100
                      ? movie.moTa.substring(0, 30) + "..."
                      : movie.moTa}
                  </Text>
                  <Button
                    onClick={() => goToMovie(movie.maPhim)}
                    color="cyan"
                    fullWidth
                    radius="sm"
                    backGroun="cyan"
                  >
                    Đặt vé
                  </Button>
                </Group>
              </Box>
            </Grid.Col>
          );
        })}
      </Grid>
      <Pagination
        noWrap="true"
        marginTop="30px"
        page={page?.totalPages}
        onChange={handleChange}
        total={2}
        radius="sm"
        spacing="md"
        position="center"
        color="cyan"
        sx={(theme) => ({
          [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            marginTop: "10px",
            padding: "0 20px ",
          },
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            marginTop: "10px",
            padding: "0 40px ",
          },
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            marginTop: "10px",
            padding: "0 60px ",
          },
        })}
      />
      ;
    </Container>
  );
};

export default MovieShowing;
