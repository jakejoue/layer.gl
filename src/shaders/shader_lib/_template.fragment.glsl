#include <prelude>
#include <pick_pars_frag>

uniform vec2 MAPV_resolution;

#pragma ORIGIN_MAIN

void main() {
    originMain();
    #include <pick_frag>
}