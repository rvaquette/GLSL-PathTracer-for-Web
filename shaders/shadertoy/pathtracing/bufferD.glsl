#ifndef OPT_SHADERTOY_LIGHT

// START_BUFFERD_CODE
// END_BUFFERD_CODE

uniform float invSampleCounter;

in vec2 TexCoords;

#include "../../common/tonemap.glsl"

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    CreateTonemapImage(iChannel0, fragColor);
}

#else

// Set to the iChannel containing the alphabet texture
#define FONT_TEXTURE iChannel3

#include "../../common/print.glsl"

// Color declarations
#define RED     vec3( 1,.3,.4)
#define GREEN   vec3(.2, 1,.4)

makeStr(printStr0)  _S _h _a _d _e _r _COL __ #SHADER# _end
makeStr(printStr1)  _DIV _EXC _ANTI __ _R _u _n __ _t _h _e __ _J _S __ _C _o _d _e __ _t _o __ _e _x _e _c _u _t _e __ _DIV _EXC _ANTI _end
makeStr(printStr2)  __ __ __ __ __ __ __ __ __ __ __ _t _h _e __ _s _h _a _d _e _r _end
makeStr(printStr3)  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ _o _r _end
makeStr(printStr4)  __ __ __ _I _n _s _t _a _l _l __ _t _h _e __ _C _h _r _o _m _e __ _e _x _t _e _n _s _i _o _n _end
makeStr(printStr5)  __ __ __ __ __ __ __ _LPR _S _e _e __ _f _i _r _s _t __ _c _o _m _m _e _n _t _RPR _end

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.y;
    
    vec3 col = vec3(0);
    
    // Font Size (higher values = smaller font)
    const float font_size = 9.;
    
    uv *= font_size;        // Scale font with font_size
    
    uv.y -= font_size - 1.;
    col += printStr0(uv);   
    
    uv.y += 1.;
    col += RED * printStr1(uv);   
    
    uv.y += 1.;
    col += RED * printStr2(uv); 
    
    uv.y += 1.5;
    col += GREEN * printStr3(uv); 
    
    uv.y += 1.5;
    col += GREEN * printStr4(uv); 
    
    uv.y += 2.;
    col += printStr5(uv); 
    
    fragColor = vec4(col, 1.);
}

#endif