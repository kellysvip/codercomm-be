import request from "supertest";
import app from "../../../../app";

describe("Posts", () => {
  test("GET / --> Get all posts an user(Sunny) can see with pagination", async () => {
    const { body } = await request(app)
      .get("/posts/user/638c68cb314a4f698631550b")
      .query({ page: 1, limit: 10 })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        posts: [
          {
            reactions: {
              like: 0,
              dislike: 0,
            },
            _id: "638db94833be38f01f2f573b",
            content: "123454654",
            image: "link",
            author: {
              _id: "638c68cb314a4f698631550b",
              name: "Sunny",
              email: "sunny.duong.02@gmail.com",
              avatarUrl: "",
              coverUrl: "",
              aboutMe: "",
              city: "HCM",
              country: "",
              company: "",
              jobTitle: "",
              facebookLink: "",
              instagramLink: "",
              linkedLink: "",
              twitterLink: "",
              friendCount: 0,
              postCount: 1,
              createdAt:  expect.any(String),
              updatedAt:  expect.any(String),
              __v: 0,
            },
            commentCount: 0,
            createdAt:  expect.any(String),
            updatedAt:  expect.any(String),
            __v: 0,
          },
        ],
        totalPage: 1,
        count: 1,
      },
      message: "Get All Post User Can See Success",
    });
  });
});
