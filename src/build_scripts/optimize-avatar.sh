#!/usr/bin/env bash

mozjpeg_options='{"quality":75,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":8,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":true,"trellis_loops":15,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":76}'

resize_360_options='{"enabled":true,"width":360,"height":360,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}'
resize_540_options='{"enabled":true,"width":540,"height":540,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}'
resize_720_options='{"enabled":true,"width":720,"height":720,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}'
resize_1080_options='{"enabled":true,"width":1080,"height":1080,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}'

npx @squoosh/cli --resize "$resize_360_options"  --mozjpeg "$mozjpeg_options" -d ./src/web_page/images         ./src/raw_resources/images/avatar.jpg
npx @squoosh/cli --resize "$resize_540_options"  --mozjpeg "$mozjpeg_options" -d ./src/web_page/images -s 1.5x ./src/raw_resources/images/avatar.jpg
npx @squoosh/cli --resize "$resize_720_options"  --mozjpeg "$mozjpeg_options" -d ./src/web_page/images -s 2x   ./src/raw_resources/images/avatar.jpg
npx @squoosh/cli --resize "$resize_1080_options" --mozjpeg "$mozjpeg_options" -d ./src/web_page/images -s 3x   ./src/raw_resources/images/avatar.jpg
