#include <prelude>
#include <pick_pars_vert>

uniform vec2 MAPV_resolution;

#pragma ORIGIN_MAIN

void main() {
    originMain();
    #include <pick_vert>
}