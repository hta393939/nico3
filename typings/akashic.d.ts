
/**
 * 全部が入っている
 */
declare namespace g {

class Event {
}

class JoinEvent extends Event {
/**
 * 発火元
 */
  player: Player;
}

class Trigger {
  constructor();
  /** リスナ追加 */
  add(): any;
  /** リスナ追加 */
  addOnce(): any;
}

class E {
  constructor(param: {});
  /** 追加 */
  append(e: E): void;
}

/**
 * スプライト
 */
class Sprite {
  constructor();
}

/**
 * 1人のプレイヤー
 */
interface Player {
  /** プレイヤーID */
  id: string;
/**
 * opt
 */
  name: string;
}


/** シーン */
class Scene {
  /**
   * 
   * @param param 
   */
  constructor(param: any);


  children: E[];

  message: Trigger;
  update: Trigger;

  /** オブジェクトを追加する */
  append(obj: any): any;
}


class Game {
  /** 自進行フレーム数 */
  age: number;

  /** 幅 */
  width: number;
  /** 高さ */
  height: number;

  /**
   * シーン追加
   * @param scene 
   */
  pushScene(scene: Scene): any;
}

/** ゲームインスタンス */
var game: Game;

}


interface AEConfig {
  /** 30fps */
  fps: number;
  width: number;
  height: number;
  assets: any;
}

interface AEInit {
  canvas: HTMLCanvasElement;
  configuration: AEConfig;
  mainFunc: (g: any, args: any[]) => void;
}

/** 単独html版用 */
declare namespace AE {
  function initialize(): any;
}

