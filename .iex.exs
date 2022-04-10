import_if_available(Ecto.Query)
import_if_available(Ecto.Changeset)

alias Huzzah.NomicsClient
alias Huzzah.Repo

defmodule AC do
  IEx.configure(
    default_prompt:
      [
        # ANSI CHA, move cursor to column 1
        "\e[G",
        :light_magenta,
        # plain string
        "🧪 iex",
        ">",
        :white,
        :reset
      ]
      |> IO.ANSI.format()
      |> IO.chardata_to_string()
  )
end
