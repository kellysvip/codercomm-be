import request from "supertest";
import app from "../../../../app";

describe("Comments", () => {
  test("GET / --> Get Single Comment ", async () => {
    const { body } = await request(app)
      .get("/comments/638dc0eef9fcbc404d126514")
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        comment: {
          reactions: {
            like: 0,
            dislike: 0,
          },
          _id: "638dc0eef9fcbc404d126514",
          content: "hello world",
          author: "638c68cb314a4f698631550b",
          post: "638dbcb1affb715ceef56a3a",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Get Single Comment Success",
    });
  });
});
