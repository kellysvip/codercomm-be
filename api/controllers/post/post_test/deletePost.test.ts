import request from "supertest";
import app from "../../../../app";

describe("Posts", () => {
  test("DELETE / --> Delete a Post (soft delete)", async () => {
    const { body } = await request(app)
      .delete("/posts/638dbb9aca88d2a74821ff39")
      .expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
            "post": {
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "_id": "638dbb9aca88d2a74821ff39",
                "content": "posttodelete",
                "image": "link",
                "author": "638c68cb314a4f698631550b",
                "commentCount": 0,
                "createdAt": expect.any(String),
                "updatedAt": expect.any(String),
                "__v": 0
            }
        },
        "message": "Delete Post Success"
    });
  });
});
