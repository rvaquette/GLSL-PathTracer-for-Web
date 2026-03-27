import GUI from '../external/gui/lil-gui.esm.js';
import { MathUtils } from '../math/mathUtils.js';
import { Vec3 } from '../math/vec3.js';
import { AlphaMode, MediumType } from '../core/material.js';
export class Controls {
    static gui = null;
    static material = null;
    static build(main) {
        if (Controls.gui) {
            Controls.gui.destroy();
            Controls.gui = null;
        }
        let gui = new GUI({ title: 'Settings' });
        Controls.gui = gui;
        const renderer = main.renderer;
        const scene = renderer.scene;
        const renderOptions = scene.renderOptions;
        if (typeof window.fullScreen === 'function') {
            gui.add({ fullScreen: function () { window.fullScreen(); } }, 'fullScreen').name('Full Screen');
        }
        let pause = gui.add({ pause: function () { main.pauseOrContinue(); } }, 'pause').name('Pause rendering').onChange(() => {
            pause.name(main.stopped ? 'Continue rendering' : 'Pause rendering');
        });
        gui.add(renderer, 'sampleCounter').listen().name('Samples').disable();
        let scenes = { scene: scene.sceneName };
        gui.add(scenes, 'scene', main.scenes).name('Scene').onChange(async (value) => {
            await main.startSceneAsync(value);
        });
        gui.add({ envMap: main.envMaps[main.envMapIdx] }, 'envMap', main.envMaps).name('EnvMaps').onChange(async (value) => {
            await scene.addEnvMapAsync(`HDR/${value}`);
        });
        // Render Settings
        let renderSettings = gui.addFolder('Render Settings').close();
        renderSettings.add(renderOptions, 'pixelRatio', [0.25, 0.5, 0.75, 1.]).listen().name('Pixel Ratio').onChange((value) => {
            renderOptions.tileWidth = Math.floor(renderOptions.renderResolution.x * (value));
            renderOptions.tileHeight = Math.floor(renderOptions.renderResolution.y * (value));
            main.startSceneAsync(scene.sceneName);
        });
        renderSettings.add(renderOptions, 'maxSpp', -1, 256).listen().name('Max SPP').onChange((value) => {
            main.optionsChanged = true;
        });
        renderSettings.add(renderOptions, 'maxDepth', 1, 10).listen().name('Max Depth').onChange((value) => {
            main.optionsChanged = true;
        });
        renderSettings.add(renderOptions, 'enableRR').listen().name('Enable Russian Roulette').onChange((value) => {
            main.reloadShaders = true;
        });
        renderSettings.add(renderOptions, 'RRDepth', 1, 10).listen().name('Russian Roulette Depth').onChange((value) => {
            main.reloadShaders = true;
        });
        renderSettings.add(renderOptions, 'enableRoughnessMollification').listen().name('Enable Roughness Mollification').onChange((value) => {
            main.reloadShaders = true;
        });
        renderSettings.add(renderOptions, 'roughnessMollificationAmt').listen().name('Roughness Mollification Amount').onChange((value) => {
            main.optionsChanged = true;
        });
        renderSettings.add(renderOptions, 'enableVolumeMIS').listen().name('Enable Volume MIS').onChange((value) => {
            main.reloadShaders = true;
        });
        // Environment
        let environment = gui.addFolder('Environment').close();
        let uniformLightCol = Vec3.pow(renderOptions.uniformLightCol, 1.0 / 2.2);
        environment.addColor({ rgb: { r: uniformLightCol.x, g: uniformLightCol.y, b: uniformLightCol.z } }, 'rgb').listen().name('Uniform Light Color (Gamma Corrected)').onChange((value) => {
            renderOptions.uniformLightCol = Vec3.pow(new Vec3(value.r, value.g, value.b), 2.2);
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'enableEnvMap').listen().name('Enable Environment Map').onChange((value) => {
            main.reloadShaders = true;
        });
        environment.add(renderOptions, 'envMapIntensity', 0.1, 10.0).listen().name('Enviornment Map Intensity').onChange((value) => {
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'envMapRot', 0.0, 360.0).listen().name('Enviornment Map Rotation').onChange((value) => {
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'hideEmitters').listen().name('Hide Emitters').onChange((value) => {
            main.reloadShaders = true;
        });
        environment.add(renderOptions, 'enableBackground').listen().name('Enable Background').onChange((value) => {
            main.reloadShaders = true;
        });
        environment.addColor(renderOptions, 'backgroundCol').listen().name('Background Color').onChange((value) => {
            main.optionsChanged = true;
        });
        environment.add(renderOptions, 'transparentBackground').listen().name('Transparent Background').onChange((value) => {
            main.reloadShaders = true;
        });
        // Tonemapping
        let tonemapping = gui.addFolder('Tonemapping').close();
        let enableTonemap = tonemapping.add(renderOptions, 'enableTonemap').listen().name('Enable Tonemap');
        let enableAces = tonemapping.add(renderOptions, 'enableAces').listen().name('Enable ACES');
        let simpleAcesFit = tonemapping.add(renderOptions, 'simpleAcesFit').listen().name('Simple ACES Fit');
        enableTonemap.onChange((value) => {
            if (!value) {
                enableAces.setValue(false);
                simpleAcesFit.setValue(false);
                enableAces.disable();
                simpleAcesFit.disable();
            }
            else {
                enableAces.enable();
            }
        });
        enableAces.onChange((value) => {
            if (!value) {
                simpleAcesFit.disable();
                simpleAcesFit.setValue(false);
            }
            else {
                simpleAcesFit.enable();
            }
        });
        // Denoiser
        let denoiser = gui.addFolder('Denoiser').close();
        denoiser.add(renderOptions, 'enableDenoiser').listen().name('Enable Denoiser').onChange((value) => {
            main.optionsChanged = true;
        });
        denoiser.add(renderOptions, 'denoiserFrameCnt', 5, 50).listen().name('Number of Frames to skip').onChange((value) => {
            main.optionsChanged = true;
        });
        // Camera
        let camera = gui.addFolder('Camera').close();
        let fov = MathUtils.degrees(scene.camera.fov);
        let aperture = scene.camera.aperture * 1000.0;
        camera.add({ fov: fov }, 'fov', 10, 90).listen().name('Fov').onChange((value) => {
            scene.camera.setFov(value);
            main.optionsChanged = true;
        });
        camera.add({ aperture: aperture }, 'aperture', 0., 10.).listen().name('Aperture').onChange((value) => {
            scene.camera.aperture = value / 1000.0;
            main.optionsChanged = true;
        });
        camera.add(scene.camera, 'focalDist', 0.01, 50.0).listen().name('Focal Distance').onChange((value) => {
            main.optionsChanged = true;
        });
        camera.add({ pos: `${scene.camera.position.x.toFixed(2)}, ${scene.camera.position.y.toFixed(2)}, ${scene.camera.position.z.toFixed(2)}` }, 'pos').listen().name('Pos').disable();
        if (scene.meshes.length === 0)
            return;
        // Objects
        let objects = gui.addFolder('Objects').close();
        const listboxItems = [];
        for (let i = 0; i < scene.meshes.length; i++) {
            listboxItems.push(scene.meshes[i].name);
        }
        let instances = objects.add({ instance: scene.meshes[0].name }, 'instance', listboxItems);
        let materials = objects.addFolder('Materials').close();
        materials = Controls.onInstanceChanged(objects, materials, scene.meshes[0].name, main);
        instances.listen().name('Instances').onChange((value) => {
            materials = Controls.onInstanceChanged(objects, materials, value, main);
        });
    }
    static onInstanceChanged(objects, materials, value, main) {
        const scene = main.renderer.scene;
        materials.destroy();
        materials = objects.addFolder('Materials').close();
        let selectedInstance = scene.meshes.find(mesh => mesh.name === value);
        const mat = selectedInstance?.material;
        // Gamma correction for color picker. Internally, the renderer uses linear RGB values for colors
        let albedo = Vec3.pow(mat.baseColor, 1.0 / 2.2);
        materials.addColor({ rgb: { r: albedo.x, g: albedo.y, b: albedo.z } }, 'rgb').listen().name('Uniform Light Color').onChange((value) => {
            mat.baseColor = Vec3.pow(new Vec3(value.r, value.g, value.b), 2.2);
            main.objectPropChanged = true;
        });
        materials.add(mat, 'metallic', 0.0, 1.0).listen().name('Metallic').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'roughness', 0.0, 1.0).listen().name('Roughness').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'specularTint', 0.0, 1.0).listen().name('SpecularTint').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'subsurface', 0.0, 1.0).listen().name('Subsurface').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'anisotropic', 0.0, 1.0).listen().name('Anisotropic').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'sheen', 0.0, 1.0).listen().name('Sheen').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'sheenTint', 0.0, 1.0).listen().name('SheenTint').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'clearcoat', 0.0, 1.0).listen().name('Clearcoat').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'clearcoatGloss', 0.0, 1.0).listen().name('ClearcoatGloss').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'specTrans', 0.0, 1.0).listen().name('SpecTrans').onChange((value) => {
            main.objectPropChanged = true;
        });
        materials.add(mat, 'ior', 1.001, 2.0).listen().name('Ior').onChange((value) => {
            main.objectPropChanged = true;
        });
        let alphaMode = mat.alphaMode;
        let alphaModeAsString = alphaMode === AlphaMode.Opaque ? 'Opaque' : alphaMode === AlphaMode.Blend ? 'Blend' : 'Mask';
        materials.add({ alphaMode: alphaModeAsString }, 'alphaMode', ['Opaque', 'Blend', 'Mask']).listen().name('Alpha Mode').onChange((value) => {
            main.reloadShaders = true;
            main.objectPropChanged = true;
            mat.alphaMode = value === 'Opaque' ? AlphaMode.Opaque : value === 'Blend' ? AlphaMode.Blend : AlphaMode.Mask;
            opacity.show(mat.alphaMode === AlphaMode.Opaque);
        });
        let opacity = materials.add(mat, 'opacity', 0.0, 1.0).listen().name('Opacity').onChange((value) => {
            main.objectPropChanged = true;
        });
        opacity.show(alphaMode === AlphaMode.Opaque);
        let mediumTypeGui = materials.addFolder('Medium Type');
        let mediumType = mat.mediumType;
        let mediumTypeAsString = mediumType === MediumType.None ? 'None' : mediumType === MediumType.Absorb ? 'Absorb' : mediumType === MediumType.Scatter ? 'Scatter' : 'Emissive';
        materials.add({ mediumType: mediumTypeAsString }, 'mediumType', ['None', 'Absorb', 'Scatter', 'Emissive']).listen().name('Medium Type').onChange((value) => {
            main.reloadShaders = true;
            main.objectPropChanged = true;
            mat.mediumType = value === 'None' ? MediumType.None : value === 'Absorb' ? MediumType.Absorb : value === 'Scatter' ? MediumType.Scatter : MediumType.Emissive;
            mediumTypeGui = Controls.onMediumTypeChanged(materials, mediumTypeGui, mat.mediumType, mat, main);
        });
        mediumTypeGui = Controls.onMediumTypeChanged(materials, mediumTypeGui, mat.mediumType, mat, main);
        return materials;
    }
    static onMediumTypeChanged(materials, mediumType, value, mat, main) {
        mediumType.destroy();
        mediumType = materials.addFolder('Medium Type');
        const scene = main.renderer.scene;
        if (value != MediumType.None) {
            let mediumColor = Vec3.pow(mat.mediumColor, 1.0 / 2.2);
            mediumType.addColor({ rgb: { r: mediumColor.x, g: mediumColor.y, b: mediumColor.z } }, 'rgb').listen().name('Medium Color').onChange((value) => {
                mat.mediumColor = Vec3.pow(new Vec3(value.r, value.g, value.b), 2.2);
                main.objectPropChanged = true;
            });
            mediumType.add(mat, 'mediumDensity', 0.0, 5.0).listen().name('Medium Density').onChange((value) => {
                main.objectPropChanged = true;
            });
            if (value == MediumType.Scatter)
                mediumType.add(mat, 'mediumAnisotropy', -0.9, 0.9).listen().name('Medium Anisotropy').onChange((value) => {
                    main.objectPropChanged = true;
                });
        }
        return mediumType;
    }
}
//# sourceMappingURL=controls.js.map