import assert from "assert";
import Shift from "../mypage-to-ics/shift";

describe("Shift", function() {
  it("should return correct start and end Date objects", function() {
    const shift = new Shift("Jul 18, 2015", "Friday", "9:00PM", "5:00AM");
    assert.deepEqual(shift.start, new Date("2015-07-24 9:00 PM"));
    assert.deepEqual(shift.end, new Date("2015-07-25 5:00 AM"));
  });
});
