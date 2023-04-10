"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const yargs_1 = __importDefault(require("yargs"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("yargs/helpers");
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).argv;
const fileLocation = argv.fileLocation;
const outputSize = argv.outputSize || 100;
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}
const main = async () => {
    jimp_1.default.read(__dirname + fileLocation, function (err, image) {
        if (err)
            console.error(err);
        image.cover(outputSize, outputSize);
        image.write("output.png");
        for (let x = 0; x < image.getWidth(); x++) {
            for (let y = 0; y < image.getHeight(); y++) {
                const pixel = jimp_1.default.intToRGBA(image.getPixelColor(y, x));
                const avg = (pixel.r + pixel.g + pixel.b) / 3;
                const charIndex = Math.floor(map(avg, 0, 255, density.length, 0));
                process.stdout.write(chalk_1.default
                    .rgb(pixel.r, pixel.g, pixel.b)
                    .bold(`${density[charIndex]}${density[charIndex]}${density[charIndex]}`));
            }
            process.stdout.write("\n");
        }
    });
};
main();
