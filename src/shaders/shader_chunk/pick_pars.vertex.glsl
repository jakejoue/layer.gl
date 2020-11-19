// pick支持
#if defined(PICK)

    attribute vec3 aPickColor;

    uniform vec4 uSelectedColor;
    uniform vec3 uPickedColor;
    uniform bool uEnablePicked;
    uniform bool uIsPickRender;

    varying vec4 vPickColor;

    bool mapvIsPicked() {
        return uEnablePicked && aPickColor == uPickedColor;
    }

#endif