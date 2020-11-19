#if defined(PICK)

    uniform vec4 uSelectedColor;
    uniform vec3 uPickedColor;
    uniform bool uEnablePicked;
    uniform bool uIsPickRender;

    varying vec4 vPickColor;

    bool mapvIsPicked() {
        return vPickColor.a == 1.0;
    }

#endif