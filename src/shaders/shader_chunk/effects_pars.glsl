// 统一的变量类型
struct GeometricContext {
	vec3 position;
	vec3 normal;
};

// 传递到片源着色器的变量
varying GeometricContext geometry;

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

        if(dis > radius && dis < radius + groundRipple.width) {

            color *= groundRipple.color * (1.0 - abs(dis - radius) / groundRipple.width) * 2.0 + 1.0;

        } else {

            // discard;
            
        }
	}

#endif