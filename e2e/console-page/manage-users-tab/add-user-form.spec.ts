
import { test, expect, Page } from "@playwright/test";
import { routes } from "../../core/routes";
import { fillAddUserForm } from "./addUserFormHelpers";

let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()

  await page.goto(routes.console)
  await page.waitForURL(routes.console)
  await page.waitForLoadState('networkidle')

  await expect(page.getByText("Admin Actions")).toBeVisible()

  await page.getByText("Manage Users").click()
})

test.describe("Add User Form - First Name", () => {
  test.afterEach(async () => {
    await page.getByRole('button', { name: 'cancel' }).click()
  })

  test("First Name should not be empty", async () => {
    await page.getByRole('button', { name: "Add User", exact: true }).click()

    await fillAddUserForm({
      page,
      lastName: "lname",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("First Name should not be empty.")).toBeVisible()
  })

  test("First Name should not include numbers", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    const invalidString = 'l123456'

    await fillAddUserForm({
      page,
      firstName: invalidString,
      lastName: "lname",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("First Name should only have letters.")).toBeVisible()
  })

  test("First Name should not include symbols", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: "_",
      lastName: "lname",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("First Name should only have letters.")).toBeVisible()
  })

  test("First Name should have at least 2 letters", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: "f",
      lastName: "lname",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("First Name should have at least 2 letters.")).toBeVisible()
  })
})

test.describe("Add User Form - Last Name", () => {
  test.afterEach(async () => {
    await page.getByRole('button', { name: 'cancel' }).click()
  })

  test("Last Name should not be empty", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: "fname",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Last Name should not be empty.")).toBeVisible()
  })

  test("Last Name should not include numbers", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    const invalidString = 'l123456'

    await fillAddUserForm({
      page,
      firstName: 'fname',
      lastName: invalidString,
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Last Name Last Name should only have letters.")).toBeVisible()
  })

  test("Last Name should not include symbols", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: "fname",
      lastName: "_",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Last Name should only have letters.")).toBeVisible()
  })

  test("Last Name should have at least 2 letters", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: "fname",
      lastName: "l",
      email: "fakeemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Last Name should have at least 2 letters.")).toBeVisible()
  })
})

test.describe("Add User Form - Email", () => {
  test.afterEach(async () => {
    await page.getByRole('button', { name: 'cancel' }).click()
  })

  test("Email should not be empty", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: "fname",
      lastName: 'lname'
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Email should not be empty.")).toBeVisible()
  })

  test("Email format should be correct", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page,
      firstName: 'fname',
      lastName: 'lname',
      email: "notAnEmail12323_",
    })

    await page.getByTestId("add-user-btn").click()
    expect(page.getByText("Please correct the errors below and resubmit the form.")).toBeVisible()
    expect(page.getByText("Wrong Email format.")).toBeVisible()
  })
})

/*
test.describe("Add User Form - Add User", () => {
  test("Should be added if the email is not already in use", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page, 
      firstName: 'userTest',
      lastName: 'userTest',
      email: "edxtest.unusedemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    await page.waitForLoadState("networkidle")

    expect(page.getByText("Added User")).toBeVisible()
  })

  test("User should be invited if email is already in use in a different tenant", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page, 
      firstName: 'Elvis',
      lastName: 'Carrasco',
      email: "elvis@dessausoftware.com",
    })

    await page.getByTestId("add-user-btn").click()
    await page.waitForLoadState("networkidle")

    expect(page.getByText("Added User")).toBeVisible()
  })

  test("User should not be added or invited if already exists in current tenant", async () => {
    await page.getByRole('button', { name: "Add User" }).click()

    await fillAddUserForm({
      page, 
      firstName: 'Elvis',
      lastName: 'Carrasco',
      email: "edxtest.usedemail@mail.com",
    })

    await page.getByTestId("add-user-btn").click()
    await page.waitForLoadState("networkidle")

    expect(page.getByText("Added User")).not.toBeVisible()
    expect(page.getByText("Invited User")).not.toBeVisible()
  })
})

*/