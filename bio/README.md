Web link hub
============
## Info

- link hub html template with easy config
- you will need hosting to have it publicly available
- if you have any issues, comments or even feature requests write it there on github in Issues tab

## Config (config.json)

- insert your own settings
- all color are meant for font color
- all backgrounds can be HEX color(`#212121`), RGBA color (`rgb(255, 99, 71)`) or any image (`url(https://example.com/image.png)`)
- like i said you can use any image type (png, jpg, gif, etc...) even in header_img
- all borders can be percentage (`50%`) or pixels (`5px`)
- if are you using custom font url (i am recommending google fonts) you must specify font name
- if you want wider link boxes just edit width

```json
{
    "width": "500px",
    "font": "Roboto",
    "font_url": "https://fonts.googleapis.com/css?family=Roboto&display=swap",
    "background": "#212121",
    "header_name": "czQery",
    "header_img": "https://qery.cz/src/image/favicon-144.png",
    "header_img_border": "50%",
    "header_color": "#FFFFFF",
    "link_background": "#871ee3",
    "link_background_hover": "#b775f080",
    "link_border": "5px",
    "link_img_border": "5px",
    "link_name_color": "#FFFFFF",
    "link_description_color": "#b8b8b8",
    "links": [
        {
            "name": "Instagram",
            "description": "Check my cool photos!",
            "url":"https://instagram.com/czqery"
        },
        {
            "name": "Youtube",
            "description": "There are all my 360 noscope montages",
            "url":"https://www.youtube.com/channel/UC4TNbbC8jqvp0ScLYkqP62g"
        },
        {
            "name": "Web",
            "description": "Also check my cool web :)",
            "url":"https://qery.cz/l/g_web-links-template",
            "background":"url(https://i.pinimg.com/originals/c4/05/e5/c405e59f2114f36defe07f92a771d9a5.gif)"
        }
    ]
}
```
