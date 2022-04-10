[
  import_deps: [:ecto, :phoenix],
  inputs: ["{mix,.formatter}.exs", "{config,lib,test}/**/*.{heex,ex,exs}", "priv/*/seeds.exs"],
  line_length: 100,
  heex_line_length: 100,
  plugins: [Phoenix.LiveView.HTMLFormatter],
  subdirectories: ["priv/*/migrations"]
]
