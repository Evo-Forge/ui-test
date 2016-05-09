(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  QUnit.module('App.init()');
  function click(el) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // LOL
    el.dispatchEvent(evt);
  }

  QUnit.test('initialize', function() {
    var table = document.getElementById('table').cloneNode(true);
    document.getElementById('qunit-fixture').appendChild(table);
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    equal(rows, 20, 'There are 20 rows in the test table');

    var butonSelected = document.querySelector(".selected").innerHTML.trim();

    equal(butonSelected, "Load<span>ed</span> 20 rows", 'Loaded 20 rows');
  });

  QUnit.test('select 100 rows', function() {
    var btn = document.querySelectorAll(".btn");

    click(btn[2]);

    var table = document.getElementById('table').cloneNode(true);
    document.getElementById('qunit-fixture').appendChild(table);
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    equal(rows, 100, 'There are 100 rows in the test table');
    var butonSelected = document.querySelector(".selected").innerHTML.trim();

    equal(butonSelected, "Load<span>ed</span> 100 rows", 'Loaded 100 rows');
  });

  QUnit.test('select 250 rows', function() {
    var btn = document.querySelectorAll(".btn");

    click(btn[3]);

    var table = document.getElementById('table').cloneNode(true);
    document.getElementById('qunit-fixture').appendChild(table);
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    equal(rows, 250, 'There are 250 rows in the test table');
    var butonSelected = document.querySelector(".selected").innerHTML.trim();

    equal(butonSelected, "Load<span>ed</span> 250 rows", 'Loaded 250 rows');
  });

  QUnit.test('select 500 rows', function() {
    var btn = document.querySelectorAll(".btn");

    click(btn[4]);

    var table = document.getElementById('table').cloneNode(true);
    document.getElementById('qunit-fixture').appendChild(table);
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    equal(rows, 500, 'There are 500 rows in the test table');
    var butonSelected = document.querySelector(".selected").innerHTML.trim();

    equal(butonSelected, "Load<span>ed</span> 500 rows", 'Loaded 500 rows');
  });

  QUnit.test('select 1000 rows', function() {
    var btn = document.querySelectorAll(".btn");

    click(btn[5]);

    var table = document.getElementById('table').cloneNode(true);
    document.getElementById('qunit-fixture').appendChild(table);
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    equal(rows, 1000, 'There are 1000 rows in the test table');
    var butonSelected = document.querySelector(".selected").innerHTML.trim();

    equal(butonSelected, "Load<span>ed</span> 1000 rows", 'Loaded 1000 rows');
  });



  QUnit.test('filter', function() {

    $('.filterInput').val('carb');
    $('.filterInput').trigger('keyup');
    var rows = $('tbody tr:visible').length;

    equal(rows, 1, 'There is 1 row in the test table');

  });


  QUnit.test('Remove rows', function() {
    var btn = document.querySelector(".reset-rows");

    click(btn);

    var table = document.getElementById('table').cloneNode(true);
    document.getElementById('qunit-fixture').appendChild(table);
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    equal(rows, 0, 'There are 0 rows in the test table');
    var butonSelected = document.querySelector(".selected");

    equal(butonSelected, null, 'Remove rows button selected');
  });


}(jQuery));
