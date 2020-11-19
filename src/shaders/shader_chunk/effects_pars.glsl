// 统一的变量类型
struct GeometricContext {
	vec3 position;
	vec3 normal;
};

// 必须的变量
varying vec3 vGeometryPosition;
varying vec3 vGeometryNormal;

// ground—ripple的相关参数定义和方法
#if NUM_GROUND_RIPPLES > 0

    struct GroundRipple {
        vec2 center;
        float radius;
        float width;
        vec4 color;
    };

	uniform GroundRipple groundRipples[ NUM_GROUND_RIPPLES ];

	void getGroundRippleEffectColor( const in GroundRipple groundRipple, const in GeometricContext geometry, out vec4 color ) {

        // 当前点实际半径
        float radius = groundRipple.radius;

        // 目标点距离Ripple
        float dis = distance(geometry.position.xy, groundRipple.center);

        if (dis > radius && dis < radius + groundRipple.width) {

            vec4 blend = groundRipple.color;
            float percent = (1.0 - abs(dis - radius) / groundRipple.width);

            blend.rgb *= percent * 2.0 + 1.0;
            blend.a *= 1.0 - pow(1.0 - percent, 0.3);

            vec4 base = color;

            color = base * base.a + blend * blend.a;

        } else {

            // discard;
            
        }
	}

#endif