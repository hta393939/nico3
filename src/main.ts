
import { Util } from "./util";

function main(param: g.GameMainParameterObject): void {
	const scene = new g.Scene({
		game: g.game,
		// このシーンで利用するアセットのIDを列挙し、シーンに通知します
		assetIds: ["player", "shot", "se",
		  'assets/font64.png',
		  'assets/card64.png'
		]
	});
	scene.onLoad.add(() => {
		// ここからゲーム内容を記述します

		const largeSize = 64;
		// 各アセットオブジェクトを取得します
		const playerImageAsset = scene.asset.getImageById("player");
		const shotImageAsset = scene.asset.getImageById("shot");
		const seAudioAsset = scene.asset.getAudioById("se");

		const cardAsset = scene.asset.getImageById('assets/card64.png');

		// プレイヤーを生成します
		const player = new g.Sprite({
			scene: scene,
			src: playerImageAsset,
			width: playerImageAsset.width,
			height: playerImageAsset.height,
		});

		const foo = new g.Sprite({
			scene: scene,
			//src: scene.asset.getImageById('font64.png'),
			src: cardAsset,
			//width: fooAsset.width,
			//height: fooAsset.height,
			width: largeSize,
			height: largeSize,
			x: largeSize * 2,
			y: largeSize * 2,
			srcX: largeSize * 1,
			srcY: largeSize * 2,
			srcWidth: largeSize,
			srcHeight: largeSize,
		});
		scene.append(foo);


		const timePane = Util.multi(scene, 200, 50, 48, 48, 48);
		scene.setTimeout(() => {
			timePane.tag.update('123');
		}, 2000);

		const scorePane = Util.multi(scene, 50, 50, 32, 32, 32);
		scene.append(scorePane);

		let score = 0;
		scene.setInterval(() => {
			score += 10;
			let scoreText = `     ${score}`;
			let _len = scoreText.length;
			scorePane.tag.update(`${scoreText.slice(_len - 5, _len)}`);
		}, 500);

		// プレイヤーの初期座標を、画面の中心に設定します
		player.x = (g.game.width - player.width) / 2;
		player.y = (g.game.height - player.height) / 2;
		player.onUpdate.add(() => {
			// 毎フレームでY座標を再計算し、プレイヤーの飛んでいる動きを表現します
			// ここではMath.sinを利用して、時間経過によって増加するg.game.ageと組み合わせて
			player.y = (g.game.height - player.height) / 2 + Math.sin(g.game.age % (g.game.fps * 10) / 4) * 10;

			// プレイヤーの座標に変更があった場合、 modified() を実行して変更をゲームに通知します
			player.modified();
		});

		// 画面をタッチしたとき、SEを鳴らします
		scene.onPointDownCapture.add(() => {
			seAudioAsset.play();

			// プレイヤーが発射する弾を生成します
			const shot = new g.Sprite({
				scene: scene,
				src: shotImageAsset,
				width: shotImageAsset.width,
				height: shotImageAsset.height
			});

			// 弾の初期座標を、プレイヤーの少し右に設定します
			shot.x = player.x + player.width;
			shot.y = player.y;
			shot.onUpdate.add(() => {
				// 毎フレームで座標を確認し、画面外に出ていたら弾をシーンから取り除きます
				if (shot.x > g.game.width) shot.destroy();

				// 弾を右に動かし、弾の動きを表現します
				shot.x += 10;

				// 変更をゲームに通知します
				shot.modified();
			});
			scene.append(shot);
		});
		scene.append(player);
		// ここまでゲーム内容を記述します
	});
	g.game.pushScene(scene);
}

export = main;
