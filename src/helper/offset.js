import { mat4 } from "gl-matrix";

export function translateTransferOptions(transferOptions, layer) {
    const pointOffset = layer.getPointOffset();
    pointOffset[2] = pointOffset[2] || 0;

    const { projectionMatrix, viewMatrix } = transferOptions;
    const tViewMatrix = mat4.translate([], viewMatrix, pointOffset);

    return {
        ...transferOptions,
        viewMatrix: tViewMatrix,
        matrix: mat4.multiply([], projectionMatrix, tViewMatrix),
    };
}
