import { Main } from '../main.js';
import { AlphaMode, Material, MediumType } from '../core/material.js';
import GUI from '../external/gui/lil-gui.esm.js';
import { MathUtils } from '../math/mathUtils.js';
import { Vec3 } from '../math/vec3.js';

export class Params {
    sampleCount: number = 0;
}

export class Controls {
    static params: Params = new Params();
    static gui: GUI | null = null;

    static build(main: Main) {
        if (Controls.gui) {
            Controls.gui.destroy();
            Controls.gui = null;
        }
        
        let gui = new GUI({ title: 'Settings'});
        Controls.gui = gui;
        
        const renderer = main.renderer;
        const scene = renderer.scene;

        const renderOptions = scene.renderOptions;

        gui.add(renderer, 'sampleCounter').listen().name('Samples').disable();

        let scenes = { scene: scene.sceneName }
        
        gui.add(scenes, 'scene', main.scenes).name('Scene').onChange(async (value: string) => {
            await main.startSceneAsync(value);
        });

        gui.add({ envMap: main.envMaps[main.envMapIdx] }, 'envMap', main.envMaps).name('EnvMaps').onChange(async (value: string) => {
            await scene.addEnvMapAsync(`HDR/${value}`);
        });

        // Render Settings
        let renderSettings = gui.addFolder('Render Settings').close();
        renderSettings.add(renderOptions, 'pixelRatio', [0.25, 0.5, 0.75, 1.]).listen().name('Pixel Ratio').onChange((value: any) => {
            renderOptions.tileWidth = Math.floor(renderOptions.renderResolution.x * (value));
            renderOptions.tileHeight = Math.floor(renderOptions.renderResolution.y * (value));
            main.startSceneAsync(scene.sceneName);
        });
        renderSettings.add(renderOptions, 'maxSpp', -1, 256).listen().name('Max SPP').onChange((value: any) => {
            main.optionsChanged = true;
        });
        renderSettings.add(renderOptions, 'maxDepth', 1, 10).listen().name('Max Depth').onChange((value: any) => {
            main.optionsChanged = true;
        });
        renderSettings.add(renderOptions, 'enableRR').listen().name('Enable Russian Roulette').onChange((value: any) => {
            main.reloadShaders = true;
        });
        renderSettings.add(renderOptions, 'RRDepth', 1, 10).listen().name('Russian Roulette Depth').onChange((value: any) => {
            main.reloadShaders = true;
        });
        renderSettings.add(renderOptions, 'enableRoughnessMollification').listen().name('Enable Roughness Mollification').onChange((value: any) => {
            main.reloadShaders = true;
        });
        renderSettings.add(renderOptions, 'roughnessMollificationAmt').listen().name('Roughness Mollification Amount').onChange((value: any) => {
            main.optionsChanged = true;
        });
        renderSettings.add(renderOptions, 'enableVolumeMIS').listen().name('Enable Volume MIS').onChange((value: any) => {
            main.reloadShaders = true;
        });

        // Environment
        let environment = gui.addFolder('Environment').close();
        let uniformLightCol = Vec3.pow(renderOptions.uniformLightCol, 1.0 / 2.2);
        environment.addColor({ rgb: { r: uniformLightCol.x, g: uniformLightCol.y, b: uniformLightCol.z} }, 'rgb').listen().name('Uniform Light Color (Gamma Corrected)').onChange((value: { r: number, g: number, b: number}) => {
            renderOptions.uniformLightCol = Vec3.pow(new Vec3(value.r, value.g, value.b), 2.2);
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'enableEnvMap').listen().name('Enable Environment Map').onChange((value: any) => {
            main.reloadShaders = true;
        });
        environment.add(renderOptions, 'envMapIntensity', 0.1, 10.0).listen().name('Enviornment Map Intensity').onChange((value: any) => {
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'envMapRot', 0.0, 360.0).listen().name('Enviornment Map Rotation').onChange((value: any) => {
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'hideEmitters').listen().name('Hide Emitters').onChange((value: any) => {
            main.reloadShaders = true;
        });
        environment.add(renderOptions, 'enableBackground').listen().name('Enable Background').onChange((value: any) => {
            main.reloadShaders = true;
        });
        environment.addColor(renderOptions, 'backgroundCol').listen().name('Background Color').onChange((value: any) => {
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'transparentBackground').listen().name('Transparent Background').onChange((value: any) => {
            main.reloadShaders = true;
        });

        // Tonemapping
        let tonemapping = gui.addFolder('Tonemapping').close();
        let enableTonemap = tonemapping.add(renderOptions, 'enableTonemap').listen().name('Enable Tonemap');
        let enableAces = tonemapping.add(renderOptions, 'enableAces').listen().name('Enable ACES');
        let simpleAcesFit = tonemapping.add(renderOptions, 'simpleAcesFit').listen().name('Simple ACES Fit');
        enableTonemap.onChange((value: boolean) => {
            if (!value) {
                enableAces.setValue(false);
                simpleAcesFit.setValue(false);
                enableAces.disable();
                simpleAcesFit.disable();
            } else {
                enableAces.enable();
            }
        });
        enableAces.onChange((value: boolean) => {
            if (!value) {
                simpleAcesFit.disable();
                simpleAcesFit.setValue(false);
            } else {
                simpleAcesFit.enable();
            }
        });

        // Denoiser
        let denoiser = gui.addFolder('Denoiser').close();
        denoiser.add(renderOptions, 'enableDenoiser').listen().name('Enable Denoiser');
        denoiser.add(renderOptions, 'denoiserFrameCnt', 5, 50).listen().name('Number of Frames to skip')

        // Camera
        let camera = gui.addFolder('Camera').close();  
        let fov = MathUtils.degrees(scene.camera.fov);
        let aperture = scene.camera.aperture * 1000.0;
        camera.add({ fov: fov }, 'fov', 10, 90).listen().name('Fov').onChange((value: number) => {
            scene.camera.setFov(value);
            main.optionsChanged = true;
        });
        camera.add({ aperture: aperture }, 'aperture', 0., 10.).listen().name('Aperture').onChange((value: number) => {
            scene.camera.aperture = value / 1000.0;
            main.optionsChanged = true;
        });
        camera.add(scene.camera, 'focalDist', 0.01, 50.0).listen().name('Focal Distance').onChange((value: number) => {
            main.optionsChanged = true;
        });
        camera.add({ pos: `${scene.camera.position.x.toFixed(2)}, ${scene.camera.position.y.toFixed(2)}, ${scene.camera.position.z.toFixed(2)}` }, 'pos').listen().name('Pos').disable();
    }
}