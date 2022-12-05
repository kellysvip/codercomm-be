import request from "supertest";
import app from "../../../../app";

describe("Comments", () => {
  test("DELETE / --> Delete a Comment (hard delete)", async () => {
    const { body } = await request(app)
      .delete("/comments/638dc477a50bafa27887e58c")
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        comment: {
          reactions: {
            like: 0,
            dislike: 0,
          },
          _id: "638dc477a50bafa27887e58c",
          content: "comment to delete",
          author: "638c68cb314a4f698631550b",
          post: "638dbcb1affb715ceef56a3a",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Delete Comment Success",
    });
  });
});
