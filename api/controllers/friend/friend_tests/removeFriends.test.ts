import request from "supertest";
import app from "../../../../app";

describe("Friend", () => {
  test("DELETE / --> Remove friend(Current: Sunny, To: Kelly)", async () => {
    const { body } = await request(app)
      .delete("/friends/requests/638c656fbc0fca863d6c2155")
      .expect(200);
    expect(body).toEqual({});
  });
});
