#include <common>
#include <pick_pars_frag>
#include <effects_pars>

#pragma ORIGIN_MAIN

void main() {
    originMain();
    
    #include <pick_frag>
    #include <effects_frag_end>
}