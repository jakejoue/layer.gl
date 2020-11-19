
// 平行光源
struct DirectionalLight {
    vec3 direction;
    vec3 color;
};

// 点光源
struct PointLight {
    vec3 position;
    vec3 color;
    float distance;
    float decay;
};

void getDirectionalLightEffectColor( const in DirectionalLight directionalLight, const in GeometricContext geometry, out vec4 color ) {

}


void getPointLightEffectColor( const in PointLight pointLight, const in GeometricContext geometry, out vec4 color ) {

}