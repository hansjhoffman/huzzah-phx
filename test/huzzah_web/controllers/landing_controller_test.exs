defmodule HuzzahWeb.LandingControllerTest do
  use HuzzahWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, Routes.landing_path(conn, :index))

    assert html_response(conn, 200) =~ "Hero section"
  end
end
