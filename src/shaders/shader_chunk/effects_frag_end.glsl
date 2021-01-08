
#define HAS_EFFECTS

// 初始化变量
GeometricContext geometry;
geometry.position = vGeometryPosition;
geometry.normal = vGeometryNormal;

vec4 glFragcolor = gl_FragColor;

#if ( NUM_GROUND_RIPPLES > 0 )

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_GROUND_RIPPLES; i ++ ) {
        
        getGroundRippleEffectColor(groundRipples[ i ], geometry, glFragcolor);

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_CYLINDER_SPREADS > 0 )

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_CYLINDER_SPREADS; i ++ ) {
        
        getCylinderSpreadEffectColor(cylinderSpreads[ i ], geometry, glFragcolor);

	}
	#pragma unroll_loop_end

#endif

gl_FragColor = glFragcolor;