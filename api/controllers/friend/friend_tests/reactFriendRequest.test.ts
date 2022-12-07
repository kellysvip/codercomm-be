import request from "supertest";
import app from "../../../../app";

describe("Friend", () => {
  test("UPDATE / --> React friend request(Current: Kelly, From: Sunny)", async () => {
    const { body } = await request(app)
      .put("/friends/requests/638c68cb314a4f698631550b")
      .send({
        status: "accepted",
      })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        friend: {
          _id: "638dcc1398d5ab0909cae3bc",
          from: "638c68cb314a4f698631550b",
          to: "638c656fbc0fca863d6c2155",
          status: "accepted",
          createdAt: expect.any(String),
          updatedAt:  expect.any(String),
          __v: 0,
        },
      },
      message: "React Friend Request Success",
    });
  });
});
