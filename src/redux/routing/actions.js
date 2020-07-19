export const GO_NEXT = "[routing] go next";
export const GO_PREV = "[routing] go prev";
export const GO_TO = "[routing] go to";


export const goNext = () => {
    return {
        type: GO_NEXT
    }
};
export const goPrev = () => {
    return {
        type: GO_PREV
    }
};

export const goTo = (name) => {
    return {
        type: GO_TO,
        name: name
    }
};