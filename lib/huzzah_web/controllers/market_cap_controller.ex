defmodule HuzzahWeb.MarketCapController do
  use HuzzahWeb, :controller

  alias Huzzah.NomicsClient

  def index(conn, _params) do
    {:ok, %Tesla.Env{:body => response}} = NomicsClient.market_cap()

    conn
    |> render("index.html", cryptos: response)
  end
end
