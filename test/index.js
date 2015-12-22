import test from "tape"
import imaginaria from "../src"

test("imaginaria", (t) => {
  t.plan(1)
  t.equal(true, imaginaria(), "return true")
})
