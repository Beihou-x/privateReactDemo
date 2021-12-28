export function Push_Subscribe() {
    let subscribes = {};

    function subscribe(event, callback) {
        if (subscribes[event]) {
            subscribes[event].push(callback);
        } else {
            subscribes[event] = [callback];
        }
    }


    function pushlist(event, params) {
        //1----每次循环性能估计不好
        // Object.keys(subscribes).map(item => {
        //     if (item === event) {
        //         (subscribes[item] && subscribes[item] || []).map(q => {
        //             q(params);
        //         });
        //     }
        // })
        //2----直接取值
        if (subscribes[event]) {
            (subscribes[event] || []).map(item => {
                item(params);
            })
        }
    }

    function unsubscribe(event) {

    }

    return {
        subscribe,
        pushlist,
        unsubscribe,
    }
}