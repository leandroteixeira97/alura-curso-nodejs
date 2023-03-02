import fs from 'fs';
import chalk from "chalk";

function handleError(error) {
    throw new Error(chalk.red(error.code, 'There is no file in such directory'));
}

async function getFile(path) {
    try {
        const encoding = 'utf-8';
        const response = await fs.promises.readFile(path, encoding);
        return extractLinks(response);
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
    return results.length !== 0 ? results : 'There are no links in the given text!';
}

export default getFile;
