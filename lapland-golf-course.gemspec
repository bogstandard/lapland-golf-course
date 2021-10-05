# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "lapland-golf-course"
  spec.version       = "0.1.0"
  spec.authors       = ["Bogstandard"]
  spec.email         = ["eric.daddio@gmail.com"]

  spec.summary       = "The theme for Lapland Golf Club"
  spec.homepage      = "https://github.com/bogstandard/lapland-golf-club"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
