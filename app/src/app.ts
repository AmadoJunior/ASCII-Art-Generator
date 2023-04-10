import jimp from "jimp";
import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;
const fileLocation = argv.fileLocation;
const outputSize = argv.outputSize || 100;
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

function map(
  value: number,
  istart: number,
  istop: number,
  ostart: number,
  ostop: number
): number {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

async function main() {
  jimp.read(__dirname + fileLocation, function (err, image) {
    if (err) console.error(err);
    image.cover(outputSize, outputSize);
    image.write("output.png");
    for (let x = 0; x < image.getWidth(); x++) {
      for (let y = 0; y < image.getHeight(); y++) {
        const pixel = jimp.intToRGBA(image.getPixelColor(y, x));
        const avg = (pixel.r + pixel.g + pixel.b) / 3;
        const charIndex = Math.floor(map(avg, 0, 255, density.length, 0));
        process.stdout.write(
          chalk
            .rgb(pixel.r, pixel.g, pixel.b)
            .bold(
              `${density[charIndex]}${density[charIndex]}${density[charIndex]}`
            )
        );
      }
      process.stdout.write("\n");
    }
  });
}

main();
