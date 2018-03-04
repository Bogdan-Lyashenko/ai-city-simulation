import { loadImage } from './loader';
import { DataLoadType } from './constants';

const loadDataModel = (root, model) => {
    if (model.data) return Promise.resolve(model.data);

    let load = null;
    switch (model.type) {
        case DataLoadType.IMG:
            load = loadImage(root + model.src);
            break;
    }

    if (load) {
        return load.then(r => {
            model.data = r;
            return model;
        });
    }

    return Promise.reject({ data: model, msg: 'Model type unknown' });
};

export const createStorage = ({ root = 'resource' } = {}) => {
    let dataToLoad = [];

    return {
        setData(data) {
            dataToLoad = [...dataToLoad, ...data];
        },

        load() {
            return Promise.all(
                dataToLoad.filter(m => !m.data).map(m => loadDataModel(root, m))
            );
        }
    };
};
