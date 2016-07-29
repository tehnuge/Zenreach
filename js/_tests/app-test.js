var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect = require('expect');
var TopBar = require('../topbar.jsx'); //my TopBar-test lives in components/__tests__/, so this is how I require in my components.

describe('TopBar', function () {
  it('renders without problems', function () {
    var TopBar = TestUtils.renderIntoDocument(<TopBar/>);
    expect(TopBar).toExist();
  });
});