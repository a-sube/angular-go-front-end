import { Pipe, PipeTransform } from '@angular/core';

function removeDotSlash(input: string) {
    if (input[0] === '.' || input[0] === '/') {
        input = input.slice(1);
        return removeDotSlash(input);
    }
    return input;
}

@Pipe({
    name: 'angularify'
})
export class AngularifyPipe implements PipeTransform {

    transform(value: any, fullName: string, id: string): any {
        // console.log(value)
        if (value.length > 0) {
            const imgRe = /<img src="([^\s]+)"/gm;
            let matches = value.match(imgRe) || []; // find all images
            for (const match of matches) {
                if (/^<img src="http?s/.test(match)) {
                    continue;
                }
                let src;
                const srcRe = /\"([^\s]+)\"/;
                if (srcRe.test(match)) {
                    src = srcRe.exec(match)[1];
                }

                value = value.replace(match, `<img src="https://github.com/${fullName}/raw/master/${src}"`);
            }

            // find all anchors with pattern - <a href="#<jump_to>">
            const anchorRe = /<a href="#([^\s]+)">/gm;
            const hashes = [];
            matches = value.match(anchorRe) || [];

            for (const match of matches) {
                let hash = '';
                if (/\"#([^\s]+)\"/.test(match)) {
                    hash = /\"#([^\s]+)\"/.exec(match)[1];
                    hashes.push(hash);
                }
                value = value.replace(match, `<a href="/repos/detail/${id}#${hash}" class="nav-link">`);
            }

            const classRe = /<a.*class="anchor".*href="#([^\s]+)"/gm;
            matches = value.match(classRe);

            for (const match of matches) {
                let hash = '';
                if (/\"#([^\s]+)\"/.test(match)) {
                    hash = /\"#([^\s]+)\"/.exec(match)[1];
                }
                value = value.replace(match, `<a class="${hash}"`);
            }

            const hrefRe = /<a.*href="(?!http)(?!mailto)([^#\s]+)"/gm;
            const innerRe = /href="(?!http)(?!mailto)([^#\s]+)"/;
            matches = value.match(hrefRe) || [];

            for (const match of matches) {
                let href = '';
                if (innerRe.test(match)) {
                    href = innerRe.exec(match)[1];
                    href = removeDotSlash(href);

                    const toReplace = match.replace(innerRe, `href="https://github.com/${fullName}/blob/master/${href}"`);

                    value = value.replace(match, toReplace);
                }
            }

            return value;
        }

        return value;
    }

}
