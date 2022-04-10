import Config

# Configure your database
config :huzzah, Huzzah.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "huzzah_dev",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with esbuild to bundle .js and .css sources.
config :huzzah, HuzzahWeb.Endpoint,
  https: [
    ip: {0, 0, 0, 0},
    port: 4000,
    cipher_suite: :strong,
    certfile: "priv/cert/dev.crt",
    keyfile: "priv/cert/dev.key"
  ],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "AKUcZn8/lwmtmRn3psiIfsyZKdUiTCLJJjlBAyVoa4YSvRp05Q07x4R4eVDuwvj2",
  watchers: [
    # Start the esbuild watcher by calling Esbuild.install_and_run(:default, args)
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]},
    npx: [
      "tailwindcss",
      "--input=css/app.css",
      "--output=../priv/static/assets/app.css",
      "--postcss",
      "--watch",
      cd: Path.expand("../assets", __DIR__)
    ]
  ]

# Watch static and templates for browser reloading.
config :huzzah, HuzzahWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/huzzah_web/(live|views)/.*(ex)$",
      ~r"lib/huzzah_web/templates/.*(eex)$"
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
