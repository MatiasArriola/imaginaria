import test from "tape";
import proxyquire from "proxyquire";
import sinon from "sinon";

import {
  formats,
  fetchImages,
  fetchVideos,
  fetchTemplates,
  fetchStatic
} from "../src/fetcher.js";

var fakeGlob = sinon.stub();
var fakePromisify = sinon.stub().withArgs(fakeGlob).returns(fakeGlob);

// let { imageFormats, fetchImages } = proxyquire("../src/fetcher.js", {
//   'glob': fakeGlob,
//   'es6-promisify': fakePromisify
// });

test("fetcher", (t) => {

  // t.ok(fakePromisify.calledWith(fakeGlob), "glob is promisified");

  t.test("formats", (t) => {
    t.ok(Array.isArray(formats.image), "have image formats");
    t.ok(Array.isArray(formats.video), "have video formats");
    t.ok(Array.isArray(formats.template), "have template formats");
    t.end();
  });

  t.test("fetchImages", (t) => {
    t.plan(2);

    t.equal(typeof fetchImages, "function", "exists and is a function");
    fetchImages("_files")
      .then((files) => t.equal(files.length, 5, "there should be 5 images"))
      .catch(() => t.fail());

  });

  t.test("fetchVideos", (t) => {
    t.plan(2);
    t.equal(typeof fetchVideos, "function", "exists and is a function");
    fetchVideos("_files")
      .then((files) => t.equal(files.length, 1, "there should be 1 video"))
      .catch(() => t.fail());
  });

  t.test("fetchTemplates", (t) => {
    t.plan(2);
    t.equal(typeof fetchTemplates, "function", "exists and is a function");
    fetchTemplates()
      .then((files) => t.equal(files.length, 3, "there should be 3 templates"))
      .catch(() => t.fail());
  });

  t.test("fetchStatic", (t) => {
    t.plan(2);
    t.equal(typeof fetchStatic, "function", "exists and is a function");
    fetchStatic()
      .then((files) => t.equal(files.length, 2, "there should be 2 static files (js and css)"))
      .catch(() => t.fail());
  });

  t.end();

});
