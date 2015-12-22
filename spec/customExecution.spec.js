'use strict';
// the next test are being performed by using the features from Apolog

var apolog = require('../index.js'),
    feature = apolog.feature,
    scenario = apolog.scenario,
    given = apolog.given,
    when = apolog.when,
    then = apolog.then,
    loadFeature = apolog.loadFeature,
    run = apolog.run,
    fs = require('fs'),
    example = [{
      file: {
        path: 'customExecutionA.feature'
      },
      content: fs.readFileSync('./spec/features/customExecutionA.feature', 'utf8')
    }, {
      file: {
        path: 'customExecutionB.feature'
      },
      content: fs.readFileSync('./spec/features/customExecutionB.feature', 'utf8')
    }]

loadFeature(example[0].content, example[0].file);
loadFeature(example[1].content, example[1].file);

describe("Custom nested execution for two features", function() {

  var execution_map = {};
  feature("Custom Execution A", function() {
    execution_map.custom_execution_a = execution_map.custom_execution_a || { count: 0 };
    execution_map.custom_execution_a.count++;
    scenario("Scenario A", function() {
      execution_map.custom_execution_a.scenario_a = execution_map.custom_execution_a.scenario_a || { count: 0 };
      execution_map.custom_execution_a.scenario_a.count++;
      given("A given", function() {
        execution_map.custom_execution_a.scenario_a.given = execution_map.custom_execution_a.scenario_a.given || { count: 0 };
        execution_map.custom_execution_a.scenario_a.given.count++;
      });
    });
    when("A when", function() {
      execution_map.custom_execution_a.when = execution_map.custom_execution_a.when || { count: 0 };
      execution_map.custom_execution_a.when.count++;
    });
  });

  feature("Custom Execution B", function() {
    execution_map.custom_execution_b = execution_map.custom_execution_b || { count: 0 };
    execution_map.custom_execution_b.count++;
    scenario("Scenario A", function() {
      execution_map.custom_execution_b.scenario_a = execution_map.custom_execution_b.scenario_a || { count: 0 };
      execution_map.custom_execution_b.scenario_a.count++;
      given("A given", function() {
        execution_map.custom_execution_b.scenario_a.given = execution_map.custom_execution_b.scenario_a.given || { count: 0 };
        execution_map.custom_execution_b.scenario_a.given.count++;
      });
    });
    when("A when", function() {
      execution_map.custom_execution_b.when = execution_map.custom_execution_b.when || { count: 0 };
      execution_map.custom_execution_b.when.count++;
    });
  });

  scenario("Scenario A", function() {
    execution_map.scenario_a = execution_map.scenario_a || { count: 0 };
    execution_map.scenario_a.count++;
    when("An and", function() {
      execution_map.scenario_a.and = execution_map.scenario_a.and || { count: 0 };
      execution_map.scenario_a.and.count++;
    });
  });
  
  then("A step", function() {
    execution_map.then = execution_map.then || { count: 0 };
    execution_map.then.count++;
  });

  run();

  it('Scenario C is visible for both Features', function() {
    console.log(execution_map);
    expect(execution_map.custom_execution_a.count).toBe(1);
    expect(execution_map.custom_execution_a.scenario_a.count).toBe(1);
    expect(execution_map.custom_execution_a.scenario_a.given.count).toBe(1);
    expect(execution_map.custom_execution_a.when.count).toBe(1);
    expect(execution_map.scenario_a.count).toBe(1);
    expect(execution_map.scenario_a.and.count).toBe(2);
    expect(execution_map.then.count).toBe(2);
//    expect(execution_map.custom_execution_b.scenario_c.count).toBe(1);
//    expect(execution_map.scenario_c.then.count).toBe(2);
//    expect(feature).toBe(1);
  });
});



