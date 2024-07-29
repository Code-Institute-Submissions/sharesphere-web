import { rest } from "msw";

// Taken from:
// https://github.com/mr-fibonacci/moments/blob/be21d73ba17a071bfb941c9587575c0a9e10615b/src/mocks/handlers.js
const baseURL = "https://wt-rest-fw-api-3be4d49beb1c.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, () => {
    return rest.json({
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
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
