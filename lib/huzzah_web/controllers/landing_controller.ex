defmodule HuzzahWeb.LandingController do
  use HuzzahWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
