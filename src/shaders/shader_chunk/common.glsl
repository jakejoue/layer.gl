#ifdef GL_ES
precision highp float;
#else

#if !defined(lowp)
#define lowp
#endif

#if !defined(mediump)
#define mediump
#endif

#if !defined(highp)
#define highp
#endif

#endif

// 定义geometry结构体
struct GeometricContext {
	vec3 position;
	vec3 normal;
};

// 定义通用变量
uniform vec2 MAPV_resolution;