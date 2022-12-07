import request from "supertest";
import app from "../../../../app";

describe("Comment", () => {
  test("POST /friends --> Send a new friend request(From currentuser(Sunny) to Kelly)", async () => {
    const { body } = await request(app)
      .post("/friends/requests")
      .send({
        to: "638c656fbc0fca863d6c2155",
      })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        friend: {
          from: "638c68cb314a4f698631550b",
          to: "638c656fbc0fca863d6c2155",
          status: "pending",
          _id: "638dcc1398d5ab0909cae3bc",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Send Friend Request Success",
    });
  });
});
