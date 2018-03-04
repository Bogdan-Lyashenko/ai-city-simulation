export let uiActions = {
    learning: {
        stats: {
            defineTableModel: tableHead => state => ({ tableHead }),
            setTableRows: tableRows => state => ({ tableRows })
        },
        cameraMonitor: {
            setContext: el => state => ({ context: el.getContext('2d') }),
            setImageData: imageData => state => ({ imageData })
        }
    }
};

export const linkActionsCopy = newActionsObject =>
    (uiActions = newActionsObject);

export const defineTableModel = tableModel =>
    uiActions.learning.stats.defineTableModel(tableModel);

export const setTableRows = rows => uiActions.learning.stats.setTableRows(rows);

export const setImageData = imageData =>
    uiActions.learning.cameraMonitor.setImageData(imageData);
