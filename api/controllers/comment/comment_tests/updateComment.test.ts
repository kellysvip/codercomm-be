import request from "supertest";
import app from "../../../../app";

describe("Comment", () => {
  test("UPDATE / --> update a commnent", async () => {
    const { body } = await request(app)
      .put("/comments/638c68cb314a4f698631550b")
      .send({ content: "comment updatedd" })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        comment: {
          reactions: {
            like: 0,
            dislike: 0,
          },
          _id: "638dc3f2bc02ee39f346a494",
          content: "comment updatedd",
          author: "638c68cb314a4f698631550b",
          post: "638dbcb1affb715ceef56a3a",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Update Comment Success",
    });
  });
});
