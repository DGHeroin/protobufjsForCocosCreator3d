

import { _decorator, Component, Node, GFXBufferAccessBit } from "cc";
const { ccclass, property } = _decorator;

@ccclass("App")
export class App extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        var content = `
        syntax = "proto2";
package game.proto;
message GameRequest {
  required string action  = 1;
  required string key     = 2;
  required string uuid    = 3;
  required int64  userId  = 4;
  optional bytes  data    = 5;
}

        `

        var PBReaderFunc = function() {
            return {
                filename: "game.proto",
                content:  content,
            }
        }

        protobuf.load(PBReaderFunc, function(err, root) {
            // console.error(err, root);
            if (err !== null) {
                console.error('加载错误', err);
                return;
            }
            var GameRequest = root.lookupType("game.proto.GameRequest");
            if(GameRequest === null) { // 解析失败了
                return;
            }
            var gameMessage = {
                action: "gameMatching",
                key:    "my-key",
                uuid:   "my-uuid",
                userId:  282,
            }
            // 编码
            var message    = GameRequest.create(gameMessage);
            var binaryData = GameRequest.encode(message).finish()
            console.log("编码二进制数据:", binaryData);
            // 解码
            var msg = GameRequest.decode(binaryData);
            var obj = GameRequest.toObject(msg);
            console.log("解码成对象", obj);
        })


    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
