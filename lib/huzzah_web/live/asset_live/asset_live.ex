defmodule HuzzahWeb.AssetLive do
  use HuzzahWeb, :live_view

  @impl true
  def mount(%{"ticker" => ticker}, _session, socket) do
    socket =
      socket
      |> assign(:ticker, ticker)

    {:ok, socket}
  end

  @impl true
  def handle_params(%{"ticker" => ticker}, _, socket) do
    {:noreply,
     socket
     |> assign(:page_title, page_title(ticker))
     |> assign(:candle_data, """
     [
     {
     "time": "2019-04-11",
     "value": 80.01
     },
     {
     "time": "2019-04-12",
     "value": 96.63
     },
     {
     "time": "2019-04-13",
     "value": 76.64
     },
     {
     "time": "2019-04-14",
     "value": 81.89
     },
     {
     "time": "2019-04-15",
     "value": 74.43
     },
     {
     "time": "2019-04-16",
     "value": 80.01
     },
     {
     "time": "2019-04-17",
     "value": 96.63
     },
     {
     "time": "2019-04-18",
     "value": 76.64
     },
     {
     "time": "2019-04-19",
     "value": 81.89
     },
     {
     "time": "2019-04-20",
     "value": 74.43
     }
     ]
     """)}
  end

  defp page_title(ticker), do: ticker <> " - Huzzah"
end
