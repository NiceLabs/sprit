import { assert } from "chai";
import {  hashElement } from "folder-hash";
import fs from "fs";
import _ from "lodash";
import os from "os";
import path from "path";

export const SAMPLE_GLOB = path.join(__dirname, "sample", "*.png");

export function mkdtemp() {
    const target = fs.realpathSync(os.tmpdir());
    return fs.mkdtempSync(target);
}

export function test(context: string, done: () => void, expected: string[], stream: NodeJS.ReadWriteStream) {
    stream.on("end", async () => {
        const hashed = await hashElement(context, {
            files: { exclude: ["sprite.png"] },
        });
        assert.deepEqual(_.map(hashed.children, "hash"), expected);
        done();
    });
}
