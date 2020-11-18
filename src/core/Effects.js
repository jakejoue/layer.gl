class LayerEffect {
    constructor(id, uniformName) {
        this.id = id;
        this.uniformName = uniformName;

        this.size = 0;
        this.seq = [];
    }

    add(effectLayer) {
        this.size += effectLayer.group.length;
        this.seq.push(effectLayer);
    }

    update(program) {
        const objs = [].concat(...this.seq.map((l) => l.getEffectObjs()));
        program.setUniform(this.uniformName, objs);
    }
}

function parseEffect(effects, container) {
    for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];

        const { effectType: id, effectUniformName: uniformName } = effect;

        if (!id) continue;

        const map = container.map;
        let next = map[id];

        if (next === undefined) {
            next = new LayerEffect(id, uniformName);
            map[id] = next;
        }

        next.add(effect);
    }
}

export default class Effects {
    constructor(effects = []) {
        this.map = {};

        parseEffect(effects, this);
    }

    update(program) {
        for (const key in this.map) {
            this.map[key].update(program);
        }
    }
}
