#if defined(PICK)

    uniform bool uIsPickRender;
    varying vec4 vPickColor;

    bool mapvIsPicked() {
        return vPickColor.a == 1.0;
    }

#endif