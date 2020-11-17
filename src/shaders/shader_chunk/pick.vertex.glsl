#if defined(PICK)

    vPickColor = vec4(aPickColor, 0.0);
    if (mapvIsPicked()) {
        vPickColor.a = 1.0;
    }

#endif