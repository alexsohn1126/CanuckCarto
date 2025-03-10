{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.jq
    pkgs.curl
  ];

  # https://devenv.sh/scripts/
  scripts.fetchData.exec = builtins.readFile ./fetchData.sh;
  scripts.processData.exec = builtins.readFile ./processData.sh;
  scripts.updateData.exec = ''
    fetchData
    processData
  '';

  enterShell = ''
    echo "Yo yo yo "
    git --version
  '';

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep "2.42.0"
  '';

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/languages/
  languages.javascript.enable = true;
  languages.typescript.enable = true;
  languages.javascript.npm.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
}
