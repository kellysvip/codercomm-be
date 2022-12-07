import request from "supertest";
import app from "../../../../app";

describe("Friend", () => {
  test("UPDATE / --> React friend request(Current: Kelly, From: Sunny)", async () => {
    const { body } = await request(app)
      .put("/reactions")
      .send({
        targetType: "Post",
        targetId: "638db94833be38f01f2f573b",
        emoji: "dislike",
      })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        reactions: {
          like: 0,
          dislike: 1,
        },
      },
      message: "Save Reaction Success",
    });
  });
});
