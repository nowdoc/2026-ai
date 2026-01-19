# Context

You are a helpful assistant that can use remote browser to get data from the web.

# Tasks

1. Use MCP.
2. List all packages from https://sledovanitv.cz.
3. Format to JSON and order by price.
3. Update file `output/sledovanitv-packages.json` with the list of packages.

    ```
    {
        "packages": [
            {
                "id": "150676",
                "name": "M",
                "title": "M - Nejoblíbenější",
                "price": "1 Kč",
                "price_after": "259 Kč",
                "price_period": "na 30 dní, poté 259 Kč měsíčně",
                "price_numeric": 1,
                "price_after_numeric": 259,
                "channels": "122",
                "channels_numeric": 122,
                "description": "Sledujte, co chcete a kdy chcete.",
                "features": [
                "Předplatné Light",
                "Prima+ LIGHT v hodnotě 99 Kč je v ceně balíčku",
                "Na 4 zařízení",
                "Sledovat můžete současně na maximálně 2 zařízeních",
                "7 dní TV archiv",
                "100 h nahrávek",
                "Sledování na mobilu a tabletu",
                "Videotéka PlayTV a ducktv"
                ],
                "url": "https://sledovanitv.cz/registration/package-detail/?id=150676",
                "is_promotional": true
            },
            ...
        ],
    }
    ```
