define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var authConfig = {
    baseUrl: "",
    loginUrl: 'users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/'
  };

  exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Home = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
		function Home(router, users, auth) {
			_classCallCheck(this, Home);

			this.router = router;
			this.auth = auth;
			this.loginError = '';
			this.users = users;
			this.message = 'Home';
			this.showLogin = true;
			this.showOK = false;
			this.showError = false;
		}

		Home.prototype.login = function login() {
			var _this = this;

			return this.auth.login(this.email, this.password).then(function (response) {
				sessionStorage.setItem("user", JSON.stringify(response.user));
				_this.loginError = "";
				_this.router.navigate('list');
			}).catch(function (error) {
				console.log(error);
				_this.loginError = "Username and or password is incorrect. Try again.";
			});
		};

		Home.prototype.showRegister = function showRegister() {
			this.user = {
				firstName: "",
				lastName: "",
				email: "",
				password: ""
			};
			this.registerError = "";
			this.showLogin = false;
		};

		Home.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var serverResponse;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.users.save(this.user);

							case 2:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.showOK = true;
									this.user = {
										firstName: "",
										lastName: "",
										email: "",
										password: ""
									};
								} else {
									this.showError = true;
								}

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save() {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		return Home;
	}()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/todos', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _todos, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Wall = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Wall = exports.Wall = (_dec = (0, _aureliaFramework.inject)(_todos.ToDos, _aureliaAuth.AuthService, _aureliaRouter.Router), _dec(_class = function () {
    function Wall(todos, auth, router) {
      _classCallCheck(this, Wall);

      this.todos = todos;
      this.router = router;
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.message = this.user.firstName + "'s To Do List ";
      this.title = "Ross Has Things ToDo!";
      this.editTodoForm = false;
      this.showCompleted = false;
      this.modalTitle = '';
      this.selected = [];
      this.priorities = ['Low', 'Medium', 'High', 'Critical'];
    }

    Wall.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    Wall.prototype.selectAction = function selectAction(id, event) {
      var index = this.selected.indexOf(id);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(id);
      }

      $(event.target).toggleClass('active');
    };

    Wall.prototype.createTodo = function createTodo() {
      this.todoObj = {
        todo: "",
        description: "",
        dateDue: new Date(),
        userID: this.user._id,
        priority: this.priorities[0]
      };
      this.modalTitle = 'New ToDo';
      $('#mainModal').modal();
    };

    Wall.prototype.showTodo = function showTodo(todo) {
      this.todoObj = todo;
      $('#showModal').modal();
    };

    Wall.prototype.editTodo = function editTodo(todo) {
      this.todoObj = todo;
      $('#mainModal').modal();
      this.modalTitle = 'Edit ToDo';
    };

    Wall.prototype.deleteTodo = function deleteTodo() {

      for (var i = 0, l = this.selected.length; i < l; i++) {
        this.todos.deleteTodo(this.selected[i]);
      }
      this.selected = [];
    };

    Wall.prototype.completeTodo = function completeTodo(todo) {
      todo.completed = !todo.completed;
      this.todoObj = todo;
      this.saveTodo(false);
    };

    Wall.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    Wall.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    Wall.prototype.saveTodo = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(close) {
        var response, todoId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.todoObj) {
                  _context.next = 14;
                  break;
                }

                _context.next = 3;
                return this.todos.save(this.todoObj);

              case 3:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 8;
                  break;
                }

                alert("There was an error creating the ToDo");
                _context.next = 13;
                break;

              case 8:
                todoId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 12;
                return this.todos.uploadFile(this.filesToUpload, this.user._id, todoId);

              case 12:
                this.filesToUpload = [];

              case 13:
                if (close) {
                  $('#mainModal').modal('toggle');
                }

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveTodo(_x) {
        return _ref.apply(this, arguments);
      }

      return saveTodo;
    }();

    Wall.prototype.activate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.todos.getUserTodos(this.user._id);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function activate() {
        return _ref2.apply(this, arguments);
      }

      return activate;
    }();

    return Wall;
  }()) || _class);
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataServices = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DataServices(http) {
      var _this = this;

      _classCallCheck(this, DataServices);

      this.httpClient = http;
      this.BASE_URL = "/api/";

      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            console.log('Requesting ' + _request.method + ' ' + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log('Received ' + _response.status + ' ' + _response.url);
            return _response;
          }
        });
      });
    }

    DataServices.prototype.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: files
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
});
define('resources/data/todos',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ToDos = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ToDos = exports.ToDos = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function ToDos(data) {
      _classCallCheck(this, ToDos);

      this.data = data;
      this.TODOS_SERVICE = 'todos';
      this.todosArray = [];
    }

    ToDos.prototype.updateArray = function updateArray(todo) {
      for (var i = 0, l = this.todosArray.length; i < l; i++) {
        if (this.todosArray[i]._id == todo._id) {
          this.todosArray[i] = todo;
          break;
        }
      }
    };

    ToDos.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(todo) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (todo._id) {
                  _context.next = 8;
                  break;
                }

                _context.next = 3;
                return this.data.post(todo, this.TODOS_SERVICE);

              case 3:
                response = _context.sent;


                if (!response.error) {
                  this.todosArray.push(response);
                }
                return _context.abrupt('return', response);

              case 8:
                _context.next = 10;
                return this.data.put(todo, this.TODOS_SERVICE + "/" + todo._id);

              case 10:
                _response = _context.sent;


                if (!_response.error) {
                  this.updateArray(_response);
                }
                return _context.abrupt('return', _response);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    ToDos.prototype.uploadFile = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(files, userId, todoId) {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                formData = new FormData();


                files.forEach(function (item, index) {
                  formData.append("file" + index, item);
                });
                _context2.next = 4;
                return this.data.uploadFiles(formData, this.TODOS_SERVICE + "/upload/" + userId + "/" + todoId);

              case 4:
                response = _context2.sent;
                return _context2.abrupt('return', response);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function uploadFile(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return uploadFile;
    }();

    ToDos.prototype.deleteTodo = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.delete(this.TODOS_SERVICE + "/" + id);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  for (i = 0; i < this.todosArray.length; i++) {
                    if (this.todosArray[i]._id === id) {
                      this.todosArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteTodo(_x5) {
        return _ref3.apply(this, arguments);
      }

      return deleteTodo;
    }();

    ToDos.prototype.getUserTodos = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.get(this.TODOS_SERVICE + "/user/" + id);

              case 2:
                response = _context4.sent;

                if (!response.error && !response.message) {
                  this.todosArray = response;
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getUserTodos(_x6) {
        return _ref4.apply(this, arguments);
      }

      return getUserTodos;
    }();

    return ToDos;
  }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Users(data) {
      _classCallCheck(this, Users);

      this.data = data;
      this.USER_SERVICE = 'users';
    }

    Users.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.data.post(user, this.USER_SERVICE);

              case 3:
                serverResponse = _context.sent;
                return _context.abrupt('return', serverResponse);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Users;
  }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FlatPickerCustomElement = undefined;

	var _flatpickr2 = _interopRequireDefault(_flatpickr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

	var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
		function FlatPickerCustomElement(element) {
			_classCallCheck(this, FlatPickerCustomElement);

			_initDefineProp(this, 'value', _descriptor, this);

			this.element = element;
		}

		FlatPickerCustomElement.prototype.bind = function bind() {
			var defaultConfig = {
				altInput: true,
				altFormat: "F j, Y",
				wrap: true
			};
			this._config = Object.assign({}, defaultConfig);
			this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
		};

		FlatPickerCustomElement.prototype.attached = function attached() {
			this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
		};

		FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
			this.value = selectedDates[0];
		};

		FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
			if (!this.flatpickr) {
				return;
			}

			if (this.value === this.flatpickr.selectedDates[0]) {
				return;
			}

			var newDate = this.value ? this.value : undefined;

			this.flatpickr.setDate(newDate);
		};

		return FlatPickerCustomElement;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
		enumerable: true,
		initializer: null
	})), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var CompletedValueConverter = exports.CompletedValueConverter = function () {
		function CompletedValueConverter() {
			_classCallCheck(this, CompletedValueConverter);
		}

		CompletedValueConverter.prototype.toView = function toView(array, value) {
			if (!value) {
				return array.filter(function (item) {
					return !item.completed;
				});
			} else {
				return array;
			}
		};

		return CompletedValueConverter;
	}();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}
			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./resources/css/styles.css\"></require><div class=\"container\"><router-view></router-view></div></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\n\tmargin-right: 10px;\n}\n\n.topMargin{\n\tmargin-top: 10px;\n}\n\n.btn,\na{\n\tcursor: pointer;\n}\n\n.btn.btn-default{\n\tborder:1px solid #000;\n\tbackground: #000;\n\tcolor:#fff;\n}\n\n.btn.btn-default:hover,\n.btn.btn-default:focus,\n.btn.btn-default:active{\n\tcolor: #000;\n\tbackground:#fff;\n}\n\n.list-todo,\n.list-completed{\n\tlist-style: none;\n\tpadding: 0px;\n\tmargin: 0px 0px 24px;\n}\n\n.list-todo li,\n.list-completed li{\n\tlist-style: none;\n\tmargin-bottom: 8px;\n}\n\n.list-completed{\n\tmargin-top: 24px\n\tborder-top: 1px solid;\n\tpadding-top: 12px;\n}\n\nul li{\n\tcursor: pointer;\n}\n\nul li.Low i{\n\tcolor: green;\n}\nul li.Medium i{\n\tcolor: orange;\n}\nul li.High i{\n\tcolor: orange;\n}\nul li.Critical i{\n\tcolor: red;\t\n}\n\n\n\n\n\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><h1 class=\"text-center topMargin\">${message}</h1><div class=\"col-sm-6 offset-sm-3\"><div class=\"jumbotron\"><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></div></div></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><div class=\"col-sm-8 offset-sm-2 topMargin\"><button class=\"btn btn-default btn-sm pull-right\" click.trigger=\"logout()\">Sing Out</button> <button class=\"btn btn-default btn-sm pull-right rightMargin\" click.trigger=\"deleteTodo()\"><i class=\"fa fa-trash\"></i></button><h1>${message}</h1><compose view=\"./components/todoList.html\"></compose><div class=\"modal fade\" id=\"mainModal\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">${modalTitle}</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"fa fa-close\"></i></button></div><div class=\"modal-body\"><compose view=\"./components/todoForm.html\"></compose></div></div></div></div><div class=\"modal fade\" id=\"showModal\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">${todoObj.todo} - ${todoObj.priority}</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"fa fa-close\"></i></button></div><div class=\"modal-body\"><div>${todoObj.description}</div><div><label>File:</label><a target=\"_blank\" href=\"/uploads/${user._id}/${todoObj.file.filename}\">${todoObj.file.filename}</a></div></div></div></div></div></div></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template><require from=\"flatpickr/flatpickr.css\"></require><div class=\"input-group aurelia-flatpickr\"><input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div id=\"errorMsg\" class=\"alert alert-danger\" show.bind=\"loginError\" innerhtml.bind=\"loginError\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div><div class=\"form-actions text-center\"><button click.trigger=\"login()\" class=\"btn btn-default\">Login</button><br><br><span>Don't have an account? <a click.trigger=\"showRegister()\" href=\"#\">Sign up</a> today!</span></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div class=\"alert alert-success text-center\" show.bind=\"showOK\">\"Registration was successful\"<br><a click.trigger=\"showLogin = true\" href=\"#\">Please Login</a></div><form><div class=\"form-group\"><label>First Name:</label><input value.bind=\"user.firstName\" class=\"form-control\" required=\"\"></div><div class=\"form-group\"><label>Last Name:</label><input value.bind=\"user.lastName\" class=\"form-control\" required=\"\"></div><div class=\"form-group\"><label>Email:</label><input value.bind=\"user.email\" class=\"form-control\" required=\"\"></div><div class=\"form-group\"><label>Password:</label><input value.bind=\"user.password\" class=\"form-control\" required=\"\"></div><div class=\"form-actions\"><button class=\"btn btn-default\" click.trigger=\"save()\">Save</button></div></form></template>"; });
define('text!modules/components/todoForm.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"saveTodo(true)\"><div class=\"form-group topMargin\"><label for=\"todoInput\">Todo *</label><input value.bind=\"todoObj.todo\" type=\"text\" class=\"form-control\" id=\"todoInput\" aria-describedby=\"todoHelp\" required=\"\" placeholder=\"Enter ToDo\"> <small id=\"todoHelp\" class=\"form-text text-muted\">A short name for the ToDo.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"todoObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" required=\"\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"priorityInput\">Priority</label><select value.bind=\"todoObj.priority\" class=\"form-control\" id=\"exampleFormControlSelect2\" required=\"\"><option repeat.for=\"priority of priorities\" value.bind=\"priority\">${priority}</option></select><small id=\"priorityHelp\" class=\"form-text text-muted\">How urgent is this?</small></div><div class=\"form-group\"><label for=\"dueDateInput\">Due Date *</label><flat-picker value.bind=\"todoObj.dateDue\"></flat-picker><small id=\"dueDateHelp\" class=\"form-text text-muted\">The date to ToDo is due.</small></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for files&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload any files that will be useful.</small></div><div class=\"col-8\"><div><div repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></div></div></div></div><button class=\"btn btn-primary topMargin\">Save</button></form></template>"; });
define('text!modules/components/todoList.html', ['module'], function(module) { module.exports = "<template><div><div show.bind=\"!todos.todosArray.length\"><h4>Apparently, you don't have anything to do!</h4></div><ul class=\"list-todo list-group\"><li repeat.for=\"todo of todos.todosArray\" class=\"list-group-item list-group-item-action ${todo.priority}\" click.trigger=\"selectAction(todo._id,$event)\" show.bind=\"!todo.completed\"><i click.trigger=\"completeTodo(todo)\" class=\"fa fa-square-o\"></i> <span>${todo.todo}</span><a click.trigger=\"editTodo(todo)\" class=\"pull-right\"><span class=\"fa fa-edit\"></span> </a><a click.trigger=\"showTodo(todo)\" class=\"pull-right rightMargin\"><span class=\"fa fa-eye\"></span></a></li><li class=\"list-group-item\"><i class=\"fa fa-square-o\"></i> <a href=\"#\" click.trigger=\"createTodo()\">Add new ToDo</a></li></ul><div class=\"wrapper-completed\"><button class=\"btn btn-default\" type=\"button\" data-toggle=\"collapse\" data-target=\"#completedCollapse\">View completed tasks</button></div><div class=\"collapse\" id=\"completedCollapse\"><ul class=\"list-completed list-group\"><li class=\"list-group-item list-group-item-action\" repeat.for=\"todo of todos.todosArray\" click.trigger=\"selectAction(todo._id,$event)\" show.bind=\"todo.completed\" class.bind=\"(selected.indexOf(todo._id) < 0)? todo.priority : todo.priority+' active'\"><i click.trigger=\"completeTodo(todo)\" class=\"fa fa-check\"></i> <span>${todo.todo}</span><a click.trigger=\"showTodo(todo)\" class=\"pull-right\"><i class=\"fa fa-eye\"></i></a></li></ul></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map