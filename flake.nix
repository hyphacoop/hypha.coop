{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ { self, ... }:
    (inputs.flake-utils.lib.eachDefaultSystem (system:
      let

        pkgs = import inputs.nixpkgs {
          inherit system;
        };

        ruby = pkgs.ruby_3_0;

        bundix = pkgs.bundix.override {
          bundler = pkgs.bundler.override {
            ruby = pkgs.ruby_3_0;
          };
        };

        rubyGems = pkgs.bundlerEnv {
          name = "ruby-gems-env";
          inherit ruby;
          gemdir = ./.;
        };

        shellPkgs = [
          bundix
          pkgs.bundler
          ruby
          rubyGems
        ] ++ (with pkgs; [
          nodejs-18_x
        ]);

      in
      rec {

        devShells = {
          default = pkgs.mkShell {
            buildInputs = shellPkgs;
            BUNDLE_FORCE_RUBY_PLATFORM = "true";
          };
        };

      }));
}
