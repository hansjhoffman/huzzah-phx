defmodule HuzzahWeb.MarketCapView do
  use HuzzahWeb, :view

  # Phoenix LiveDashboard is available only in development by default,
  # so we instruct Elixir to not warn if the dashboard route is missing.
  @compile {:no_warn_undefined, {Routes, :live_dashboard_path, 2}}

  def format_percent(val) do
    case Float.parse(val) do
      {full_match, ""} ->
        full_match
        |> (&(&1 * 100)).()
        |> Float.round(2)
        |> Float.to_string()

      {_, _} ->
        "0.00"
    end
  end
end
