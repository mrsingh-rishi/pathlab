const zod = require("zod");

const signupZod = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const loginBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

module.exports = {
    signupZod,
    updateBody,
    loginBody
}