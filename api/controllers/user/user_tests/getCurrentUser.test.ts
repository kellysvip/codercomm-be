import request from "supertest";
import app from "../../../../app";

describe("Users", () => {
  test("GET / --> Get current User (Sunny are login)", async () => {
    const { body } = await request(app).get("/users/me").expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        user: {
          _id: "638c68cb314a4f698631550b",
          name: "Sunny",
          email: "sunny.duong.02@gmail.com",
          avatarUrl: "",
          coverUrl: "",
          aboutMe: "",
          city: "",
          country: "",
          company: "",
          jobTitle: "",
          facebookLink: "",
          instagramLink: "",
          linkedLink: "",
          twitterLink: "",
          friendCount: 0,
          postCount: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: "Get Current User Success",
    });
  });
});


