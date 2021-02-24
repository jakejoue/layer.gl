#define HAS_EFFECTS

// 必须的变量
varying vec3 vGeometryPosition;
varying vec3 vGeometryNormal;

#ifndef StructGeometricContext

struct GeometricContext {
	vec3 position;
	vec3 normal;
};

#endif

// ground—ripple的相关参数定义和方法
#if NUM_GROUND_RIPPLES > 0

    struct GroundRipple {
        vec3 center;
        float radius;
        float width;
        vec4 color;

        float percent;
    };

	uniform GroundRipple groundRipples[ NUM_GROUND_RIPPLES ];

	void getGroundRippleEffectColor( const in GroundRipple groundRipple, const in GeometricContext geometry, out vec4 color ) {

        // 在建筑物之上
        if ( groundRipple.center.z > geometry.position.z ) {
            return;
        }

        // 当前点实际半径
        float radius = groundRipple.radius * groundRipple.percent;

        // 目标点距离Ripple
        float dis = distance(geometry.position.xy, groundRipple.center.xy);

        if ( dis > radius && dis < radius + groundRipple.width ) {

            vec4 blend = groundRipple.color;
            float percent = (1.0 - abs(dis - radius) / groundRipple.width);

            blend.rgb *= percent * 2.0 + 1.0;
            blend.a *= 1.0 - pow(1.0 - percent, 0.3);

            if ( groundRipple.percent > 0.7 ) {
                blend.a *= (1.0 - groundRipple.percent) / 0.3;
            }

            vec4 base = color;

            color = base * base.a + blend * blend.a;

        } else {

            // discard;
            
        }
	}

#endif

// ground—ripple的相关参数定义和方法
#if NUM_CYLINDER_SPREADS > 0

    struct CylinderSpread {
        vec3 center;
        float radius;
        float height;
        vec4 color;

        float percent;
    };

	uniform CylinderSpread cylinderSpreads[ NUM_CYLINDER_SPREADS ];

	void getCylinderSpreadEffectColor( const in CylinderSpread cylinderSpread, const in GeometricContext geometry, out vec4 color ) {

        float percent = cylinderSpread.percent;

        // 当前的实际半径
        float currentRadius = cylinderSpread.radius * percent;

        // 多边形到中心的距离
        float dis = distance(geometry.position.xy, cylinderSpread.center.xy);

        // 当前实际的高度
        float currentHeight = cylinderSpread.center.z;

        if ( percent < 0.7 ) {
            currentHeight += cylinderSpread.height * pow(percent / 0.7, 1.3);
        } else {
            currentHeight += cylinderSpread.height;
        }

        // 指定影响范围内
        if (
            abs((1.0 - dis / currentRadius)) <= 0.005 &&
            geometry.position.z >= cylinderSpread.center.z &&
            geometry.position.z <= currentHeight
        ) {

            vec4 blend = cylinderSpread.color;
            float hPercent = 1.0 - (geometry.position.z - cylinderSpread.center.z) / cylinderSpread.height;

            blend.rgb *= hPercent * 2.0 + 1.0;
            blend.a *= 1.0 - pow(1.0 - hPercent, 0.3);

            if (percent > 0.7) {
                blend.a *= (1.0 - percent) / 0.3;
            }

            vec4 base = color;

            color = base * base.a + blend * blend.a;

        } else {

            // discard;
            
        }
	}

#endif