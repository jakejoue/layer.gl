#if ( NUM_GROUND_RIPPLES > 0 )

    vec4 glFragcolor = gl_FragColor;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_GROUND_RIPPLES; i ++ ) {
        
        getGroundRippleEffectColor(groundRipples[ i ], geometry, glFragcolor)

	}
	#pragma unroll_loop_end

    gl_FragColor = glFragcolor;

#endif