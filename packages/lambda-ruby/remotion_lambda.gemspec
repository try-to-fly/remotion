Gem::Specification.new do |s|
  s.name        = "remotion_lambda"
  s.version     = "0.0.1"
  s.summary     = "Remotion Lambda SDK"
  s.description = "A Ruby SDK for Remotion Lambda"
  s.authors     = ["Jonny Burger"]
  s.email       = "jonny@remotion.dev"
  s.files       = ["lib/sdk.rb"]
  s.homepage    =
    "https://rubygems.org/gems/remotion_lambda"
  s.license       = "MIT"
  s.add_runtime_dependency "aws-sdk-lambda",
    ["> 1.0.0"]
  s.add_runtime_dependency "json",
    ["> 2.0.0"]
  s.add_runtime_dependency "logger",
    ["> 1.0.0"]
end
