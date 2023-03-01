import fs from 'fs';
import chalk from "chalk";

function handleError(error) {
    throw new Error(chalk.red(error.code, 'There is no file in such directory'));
}

async function getFile(path) {
    const encoding = 'utf-8';
    try {
        const response = await fs.promises.readFile(path, encoding);
        extractLinks(response);
    } catch (error) {
        handleError(error);
    }
}

function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captures = [...text.matchAll(regex)];
    const results = captures.map((capture) => {
        return { [capture[1]]: capture[2] };
    });
    console.log(results)
}
getFile('./files/text.md');
