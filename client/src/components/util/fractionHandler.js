
const fractionParser = str => {

    const round2Dec = num => {
        const temp = Math.round(num * 100);
        return temp / 100;
    }

    if (Number(str) === str) {
        return str;
    }
    if (str.includes(" ")) {
        const split = str.indexOf(" ");
        return fractionParser(str.slice(0, split)) + fractionParser(str.slice(split + 1));
    } else if (str.includes("-")) {
        const split = str.indexOf("-");
        return fractionParser(str.slice(0, split)) + fractionParser(str.slice(split + 1));
    } else if (str.includes("/")) {
        const split = str.indexOf("/");
        return fractionParser(fractionParser(str.slice(0, split)) / fractionParser(str.slice(split + 1)) + '');
    } else if (Number(str) !== undefined) {
        return round2Dec(Number(str));
    } else {
        return 1;
    }
}

export default fractionParser;