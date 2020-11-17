#if defined(PICK)

    if(uIsPickRender) {
        gl_FragColor = vec4(vPickColor.rgb, 1.0);
        return;
    }

#endif