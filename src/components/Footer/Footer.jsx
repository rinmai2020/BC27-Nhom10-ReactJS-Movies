import { Avatar, Container, Grid, Group, Space } from "@mantine/core";
import React from "react";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
  AiOutlineApple,
  AiOutlineAndroid,
  AiFillPhone,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import scss from "./Footer.module.scss";
export default function Footer() {
  return (
    <Container id="Footer" size="lg" sx={(theme) => ({})}>
      <Grid>
        <Grid.Col xs={6} md={3} lg={3}>
          <Link className={scss.Logo} to="/">
            Dr. LoGo
          </Link>
        </Grid.Col>
        <Grid.Col xs={6} md={3} lg={3}>
          <h5 className={scss.h5}>Doi tac</h5>
          <Group>
            <Grid.Col className={scss.InfoFooter}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                CGV
              </a>
              <a
                className="col-6 col-lg-12"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                Galaxy
              </a>
            </Grid.Col>
          </Group>
        </Grid.Col>
        <Grid.Col xs={6} md={3} lg={3} className={scss.InfoFooter}>
          <h5 className={scss.h5}>Chính sách</h5>
          <Grid.Col>
            <Group>
              <Avatar
                size="md"
                radius="xl"
                src="https://static-s.aa-cdn.net/img/gp/20600005285939/9N7f8PWb1zlDqOR4mepkNFkRt5SlrjFoLsg5jYtVhvq9LeQneLKyHg9eEx4BSgyl7F4=w300?v=1"
              />
              <Avatar
                size="md"
                radius="xl"
                src="https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/9b/e6/c5/9be6c53e-eb2f-f3e9-ff01-445036af8ca9/source/256x256bb.jpg"
              />
            </Group>
            <Space h={10} />
            <Group>
              <Avatar
                size="md"
                radius="xl"
                src="https://cdn.mywork.com.vn/company-logo-medium/102018/3N1jjAtQffNCDZxYTeTx54khfndItCJiIBaDTvEL.w-200.h-200.fit-crop.jpeg"
              />
              <Avatar
                size="md"
                radius="xl"
                src="https://printgo.vn/uploads/file-logo/1/512x512.6ceefc7f866a88b5ebb6c32591020e26.ai.1.png"
              />
            </Group>
          </Grid.Col>
        </Grid.Col>
        <Grid.Col xs={6} md={3} lg={3} className={scss.App}>
          <h5 className={scss.h5}>App</h5>
          <AiOutlineApple />
          <AiOutlineAndroid />
        </Grid.Col>
      </Grid>
      <hr style={{ color: "#fff" }} />
      <Grid justify="space-between">
        <Grid.Col
          md={12}
          lg={6}
          sx={(theme) => ({
            color: theme.colors.cyan[6],
            textDecoration: "none",
            transition: "all 0.5s ease",
            fontSize: "15px",
            "&:hover": {
              color: theme.colors.white,
            },
          })}
        >
          <span> © 2022 Dr. LoGo. All rights reserved by Mantine.Dev</span>
        </Grid.Col>
        <Grid.Col
          align="flex-start"
          sx={(theme) => ({
            color: theme.colors.cyan[6],
            textDecoration: "none",
            transition: "all 0.5s ease",
            fontSize: "18px",
            "&:hover": {
              color: theme.colors.white,
            },
          })}
          md={12}
          lg={6}
        >
          <Group>
            <AiFillFacebook /> rinmai
            <AiOutlineInstagram /> rinmai
            <AiFillYoutube /> rinmai
            <AiFillPhone />
            (+84) 0123456789
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
