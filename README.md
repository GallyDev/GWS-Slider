# GWS-Slider
Einfaches und schlankes Script, das HTML-Elemente in Slider anhand von Attribut oder Klassen verwandelt

# Benutzung
Elemente mit dem Attribut ```gws-slider``` werden automatisch in Slider umgewandelt. Ein Slider ist ein Flex-Block-Element und alle direkt darunterliegenden Elemente sind automatisch die dazugehörigen Slides.

Das Attribut ```gws-slider``` kann auch Optionen annehmen:
- controls -> erschafft nach dem Slider ein Element mit der Klasse ```gws-controls``` welche Buttons macht, welche zum Nächsten oder vorherigen Post springen.
- pager -> erschafft nach dem Slider (und wenn vorhanden nach ```gws-controls```) ein Element mit der Klasse ```gws-pager```. Dieses enthält pro Slide ein Element, das angeklickt werden kann um direkt zu diesem Slide zu springen.
- autoplay -> springt bis zu einer User-Interaktion automatisch nach 3 Sekunden zum nächsten Slide. Die Option kann mit einem Bindestrich um eine Millisekundenanzahl erweitert werden. ```autoplay-500``` macht zwischen den automatischen Slides 500 Millisekunden Pause.

Beispiele: ```/wp-content/plugins/GWS-Debugian/dependencies/GWS-Slider/examples.html```

Anstelle des Attributs können ```gws-slider``` und die Optionen auch als Klassen verwendet werden