Get-ChildItem -Path .\scenes\pathtracer\* -File -Include *.glb,*.gltf,*.scene | Select-Object -ExpandProperty Name | ConvertTo-Json -AsArray  | Set-Content -Path pathtracer.json
Get-ChildItem -Path .\scenes\pathtracer\HDR\* -File -Include *.hdr | Select-Object -ExpandProperty Name | ConvertTo-Json -AsArray  | Set-Content -Path envmaps.json
