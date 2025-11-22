import { PaneParameterObject, SpriteParameterObject, E } from "@akashic/akashic-engine";

export class Util {
  constructor() {
  }

  initialize() {

  }

  /**
   * 1文字作る
   * @param scene 
   * @param code 
   * @param width 
   * @param height 
   * @returns 
   */
  static char(scene: g.Scene, code: number,
    width: number, height: number): g.Sprite {
    const blockSize = 64;
    const fontAsset = scene.asset.getImageById('assets/font64.png');
    const index = code - 0x20;
    const opt = {
        scene,
        src: fontAsset,
        x: 0, y: 0, width, height,
        srcX: blockSize * (index & 7), srcY: blockSize * Math.floor(index / 8),
        srcWidth: blockSize, srcHeight: blockSize,
    } as SpriteParameterObject;
    const sp = new g.Sprite(opt);
    return sp;
  }

  /**
   * ステップ固定の画像フォントペイン
   * @param scene 
   * @param inx 
   * @param iny 
   * @param dw 
   * @param dh 
   * @param step 
   * @returns 
   */
  static multi(scene: g.Scene,
    inx: number, iny: number,
    dw: number = 64, dh: number = 64, step: number = 64): g.Pane {
    const paneopt = {
        scene,
        x: inx, y: iny,
        width: dw, height: dh,
        tag: {},
    } as PaneParameterObject;
    const pane = new g.Pane(paneopt);
    pane.tag.update = function(intext: string) {
        const cnum = pane.children?.length || 0;
        for (let i = cnum - 1; i >= 0; --i) {
            const ch = pane.children[i];
            ch.destroy(); // removeもしてくれる
        }
        let _len = intext.length;
        let x = 0;
        for (let i = 0; i < _len; ++i) {
            const code = intext.charCodeAt(i);
            const sp = Util.char(scene, code, dw, dh);
            sp.x = x;
            pane.append(sp);
            x += step;
        }
        pane.width = step * (_len - 1) + dw;
        pane.height = dh;
        pane.invalidate();
    };
    return pane;
  }

}
