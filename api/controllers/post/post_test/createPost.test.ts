const request = require("supertest");
const app = require("../../../../app");

describe("Posts", () => {

  test("POST /posts --> Sunny make a new post", async () => {
    const { body } = await request(app)
      .post("/posts")
      .send({
        content: "123454654",
        image: "link",
      })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        post: {
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
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: 0,
          },
          commentCount: 0,
          reactions: {
            like: 0,
            dislike: 0,
          },
          _id: "638db94833be38f01f2f573b",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Create Post Success",
    });
  });
});
