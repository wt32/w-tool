export const copy = (obj) => {
    console.log(JSON.parse(JSON.stringify(obj)));

    return JSON.parse(JSON.stringify(obj));
}