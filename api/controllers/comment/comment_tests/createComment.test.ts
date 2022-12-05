import request from "supertest";
import app from "../../../../app";

describe("Comment", () => {
  test("POST /comments --> create a new comment", async () => {
    const { body } = await request(app)
      .post("/comments")
      .send({
        content: "hello world",
        postId: "638dbcb1affb715ceef56a3a",
      })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        comment: {
          content: "hello world",
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
            postCount: 2,
            createdAt: "2022-12-04T09:30:51.187Z",
            updatedAt: "2022-12-05T09:41:05.197Z",
            __v: 0,
          },
          post: "638dbcb1affb715ceef56a3a",
          reactions: {
            like: 0,
            dislike: 0,
          },
          _id: "638dc0eef9fcbc404d126514",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Create New Commnent Success",
    });
  });
});
