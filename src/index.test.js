import { expect } from "chai";
import jsdom from "jsdom";
import fs from "fs"; // filesystem using node

describe("Our first test", () => {
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});

describe("index.html", () => {
  it("should have h1 that says Users", (done) => {
    // async call thats why done parameter is needed here
    // get reference to index.html file
    const index = fs.readFileSync("./src/index.html", "utf-8");
    // now content in-memory within a constant called index
    // callback function / window is just like browser window
    jsdom.env(index, function (err, window) {
      // second parameter is for any JS files
      const h1 = window.document.getElementsByTagName("h1")[0];
      expect(h1.innerHTML).to.equal("Users");
      done(); // tell Mocha here that our Test is done.
      window.close(); // to free up memory when we created DOM
    });
  });
});
