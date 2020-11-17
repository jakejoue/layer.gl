// pick支持
#if defined(PICK)

    attribute vec3 aPickColor;
    uniform bool uEnablePicked;
    uniform vec3 uPickedColor;
    varying vec4 vPickColor;

    bool mapvIsPicked() {
        return uEnablePicked && aPickColor == uPickedColor;
    }

#endif