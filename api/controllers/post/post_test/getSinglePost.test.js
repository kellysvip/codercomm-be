import request from "supertest";
import app from "../../../../app";

describe("Posts", () => {
  test("GET / --> Get a single post with postId", async () => {
    const { body } = await request(app)
      .get("/posts/638db94833be38f01f2f573b")
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        post: {
          reactions: {
            like: 0,
            dislike: 0,
          },
          _id: "638db94833be38f01f2f573b",
          content: "123454654",
          image: "link",
          author: "638c68cb314a4f698631550b",
          commentCount: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
          comment: [],
        },
      },
      message: "Get Single Post Success",
    });
  });
});
