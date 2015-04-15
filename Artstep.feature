
Feature: Artstep

  Scenario: Test Scenario
    Given Artstep is installed
    When I use it
    Then I am "happy"

  Scenario: Implicit Pending Steps
    Given Artstep is installed
    When the function is not given
    Then the scenario is pending

  Scenario: Explicit Pending Steps
    Given Artstep is installed
    When the function returns PENDING
    Then the scenario is pending
