import { AccountModel } from "./account"

test("can be created", () => {
  const instance = AccountModel.create({})

  expect(instance).toBeTruthy()
})
