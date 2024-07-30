import { http, HttpsResponse } from "msw";

// Taken from:
// https://github.com/mr-fibonacci/moments/blob/be21d73ba17a071bfb941c9587575c0a9e10615b/src/mocks/handlers.js
const baseURL = "https://sharesphere-8737cda00b1a.herokuapp.com/";

export const handlers = [
  /**
   * This handler is set but not fully utilized in testing yet.
   * That is because of the how the AuthContext handles the user status
   * through local storage. So the workaround I've adopted to mock the
   * logged in status is to set the localStorage refreshTokenTimestamp object
   * in the test suite so that the AuthContext checkLoginStatus returns a
   * value for the user data.
   */
  http.get(`${baseURL}dj-rest-auth/user/`, () => {
    return HttpsResponse.json({
      pk: 1,
      username: "adminTony",
      email: "",
      first_name: "",
      last_name: "",
      profile_id: 1,
      profile_image:
        "https://res.cloudinary.com/djmipr2p0/image/upload/v1/media/images/22Q",
    });
  }),
  http.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
