# -*- encoding : utf-8 -*-
require File.join(File.dirname(__FILE__), "test_generator_helper.rb")

class TestIntegrationGenerator < Test::Unit::TestCase
  include RubiGen::GeneratorTestHelper

  def setup
    bare_setup
  end

  def teardown
    bare_teardown
  end

  # Some generator-related assertions:
  #   assert_generated_file(name, &block) # block passed the file contents
  #   assert_directory_exists(name)
  #   assert_generated_class(name, &block)
  #   assert_generated_module(name, &block)
  #   assert_generated_test_for(name, &block)
  # The assert_generated_(class|module|test_for) &block is passed the body of the class/module within the file
  #   assert_has_method(body, *methods) # check that the body has a list of methods (methods with parentheses not supported yet)
  #
  # Other helper methods are:
  #   app_root_files - put this in teardown to show files generated by the test method (e.g. p app_root_files)
  #   bare_setup - place this in setup method to create the APP_ROOT folder for each test
  #   bare_teardown - place this in teardown method to destroy the TMP_ROOT or APP_ROOT folder after each test

  def test_generator_without_options
    name = 'miracle'

    run_generator('integration', [name], sources)

    lib_dir = IntegrationGenerator::BASE_DIR + name
    test_dir = IntegrationGenerator::TEST_DIR
    assert_generated_file("#{lib_dir}.rb")
    assert_generated_file(lib_dir + "/helper.rb")
    assert_generated_file(lib_dir + "/notification.rb")

    assert_generated_file(test_dir + "#{name}_module_test.rb")
    assert_generated_file(test_dir + "helpers/#{name}_helper_test.rb")
    assert_generated_file(test_dir + "notifications/#{name}_notification_test.rb")
  end

  private
  def sources
    [RubiGen::PathSource.new(:test, File.join(File.dirname(__FILE__), "..", generator_path))
    ]
  end

  def generator_path
    "generators"
  end
end
