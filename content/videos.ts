/**
 * 院内・施術の紹介動画（YouTube）。動画IDを追加すると /about と /treatment に自動で表示される。
 * 例: { id: "dQw4w9WgXcQ", title: "院内のご案内", description: "受付から施術スペースまで" }
 * 空の間は動画セクション自体が表示されない。
 */
export type Video = { id: string; title: string; description?: string };

export const videos: Video[] = [];
