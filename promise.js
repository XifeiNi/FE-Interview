// three statuses
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

// @param function
function MyPromise(fn) {
	let _this = this;
	_this.currentState = PENDING;
	_this.value = undefined;

	// 保存回调
	_this.rejectedCallbacks = [];
	_this.resolvedCallbacls = [];

	_this.resolve = function(value) {
		if (value instanceof MyPromise) {
			return value.then(_this.resolve, _this.reject);
		}
		setTimeout(() => {
			if (_this.currentState === PENDING) {
				_this.currentState = RESOLVED;
				_this.value = value;
				_this.resolvedCallbacks.forEach(callback => callback());
			}
		});
	};


	_this.reject = function(reason) {
		setTimeout(() => {
			if (_this.currentState === PENDING) {
				_this.currentState = REJECTED;
				_this.value = reason;
				_this.rejectedCallbacks.forEach(callback => callback());
			}
		});
	}

	// new MyPromise(() => throw Error('ERROR');
	try {
		fn(_this.resolve, _this.reject);
	} catch(e) {
		_this.reject(e);
	}
}



MyPromise.prototype.then = function (onResolved, onRejected) {
	var self = this;
	// then must return a new promise
	var promise2;

	/*
	* 规范 2.2.onResolved 和 onRejected 都为可选参数
	* 如果类型不是函数需要忽略，同时也实现了透传
	* Promise.resolve(4).then().then((value) => console.log(value))
	*/
	onResolved = typeof onResolved === 'function' ? onResolved : v => v;
	onRejected = typeof onRejected === 'function' ? onRejected : r => throw r;

	if (self.currentState === RESOLVED) {
		return (promise2 = new MyPromise((resolve, reject) => {
			setTimeout(() => {
				try {
					var x = onResolved(self.value);
					resolutionProcedure(promise2, x, resolve, reject);
				} catch(e) {
					reject(reason);
				}
			});
		}));
	} 

	if (self.currentState === REJECTED) {
		return (promise2 = new MyPromise((resolve, reject) => {
			setTimeout(() => {
				try {
					var x = onRejected(self.value);
					resolutionProcedure(promise2, x, resolve, reject);
				} catch(r) {
					reject(r);
				}
			}	
		}));
	}

	if (self.currentState === PENDING) {


	
}
