import React, { useState } from "react";
import { Rate } from "antd";
import {
  BackgroundImage,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  Space,
  Text,
  RingProgress,
} from "@mantine/core";
// import { BsPlayCircle } from "react-icons/bs";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";

const Overview = ({ movieId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: movie, isLoading } = useRequest(() =>
    movieAPI.getMovieDetails(movieId)
  );

  if (!movie) {
    return null;
  }
  return (
    <>
      <Modal
        sx={(theme) => ({
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
      {!isLoading && (
        <BackgroundImage
          sx={(theme) => ({
            backdropFilter: "blur(4px)",
            position: "relative",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // minHeight: "100vh",
            marginTop: "60px",
          })}
          src={movie?.hinhAnh || ""}
        >
          <Box
            sx={(theme) => ({
              position: "absolute",
              backdropFilter: "blur(4px) brightness(0.15)",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -10,
            })}
          />
          <Container size="lg">
            <Space h={40} />
            <Grid gutter={24}>
              <Grid.Col sm={6}>
                <Box
                  sx={(theme) => ({
                    border: `0.5px solid ${theme.colors.gray[5]}`,
                    borderRadius: "16px",
                    width: "80%",
                    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                      width: "100%",
                    },
                  })}
                >
                  <Image src={movie?.hinhAnh} radius="lg" />
                </Box>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Group
                  sx={(theme) => ({
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "8px",
                  })}
                >
                  <Group>
                    {movie?.dangChieu ? (
                      <Badge
                        color="cyan"
                        size="xl"
                        radius="sm"
                        variant="filled"
                        sx={(theme) => ({
                          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                            marginRight: "10px",
                          },
                        })}
                      >
                        Đang chiếu
                      </Badge>
                    ) : movie?.sapChieu ? (
                      <Badge size="xl" radius="sm" variant="light">
                        Sắp chiếu
                      </Badge>
                    ) : null}

                    {movie?.hot && (
                      <Badge size="xl" radius="sm" color="red">
                        Hot
                      </Badge>
                    )}

                    <Group>
                      {/* <BsPlayCircle />
                        <Text>{movie?.danhGia}</Text> */}

                      <RingProgress
                        sx={(theme) => ({})}
                        size={100}
                        sections={[
                          {
                            value: movie.danhGia * 10,
                            color: "#15aabf",
                          },
                        ]}
                        label={
                          <Text
                            color="blue"
                            weight={700}
                            align="center"
                            size="xl"
                          >
                            <Text
                              sx={(theme) => ({
                                color: "#15aabf",
                              })}
                            >
                              {movie.danhGia * 10}
                            </Text>
                          </Text>
                        }
                      />
                      <Rate
                        count={5}
                        defaultValue={movie.danhGia / 2}
                        disabled
                      />
                    </Group>
                  </Group>
                  <Group>
                    <Text
                      sx={(theme) => ({
                        fontSize: 30,
                        fontWeight: 700,
                        textAlign: "left",
                        width: "100%",
                        color: "#fff",
                      })}
                    >
                      {movie?.tenPhim}
                    </Text>
                    <Text
                      sx={(theme) => ({
                        fontSize: 16,
                        fontWeight: 300,
                        textAlign: "left",
                        color: "#fff",
                        overflowY: "scroll",
                      })}
                    >
                      {movie?.moTa}
                    </Text>
                  </Group>
                  <Group
                    sx={(theme) => ({
                      marginTop: "24px",
                      width: "100%",

                      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                        justifyContent: "center",
                      },
                    })}
                  >
                    <Button
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      sx={{
                        minWidth: "40%",
                      }}
                      mr={20}
                      radius="md"
                      size="md"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <a size={18} mr={8}>
                        Trailer
                      </a>
                      {/* <FontAwesomeIcon icon={faPlay} /> */}
                    </Button>
                    <Button
                      color="cyan"
                      sx={{
                        minWidth: "40%",
                      }}
                      radius="md"
                      size="md"
                    >
                      <a
                        style={{
                          color: "#fff",
                        }}
                        href="#Showtimes"
                        size={18}
                      >
                        Đặt vé
                      </a>
                    </Button>
                  </Group>
                </Group>
              </Grid.Col>
            </Grid>
          </Container>
          <Space h={48} />
        </BackgroundImage>
      )}
    </>
  );
};

export default Overview;
