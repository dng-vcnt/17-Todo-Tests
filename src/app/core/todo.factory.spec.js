describe('todoFactory', function() {

  beforeEach(function() {
    bard.appModule('app');
    bard.inject('todoFactory', 'apiUrl', '$httpBackend');
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
  });

  // GET ALL TEST
  describe('when getAll is called', function() {
    it('should return data on success', function() {
      var response = { data: [{}] };

      $httpBackend.whenGET(apiUrl + '/todos').respond(response);
      todoFactory.getAll().then(
        function(data) {
          expect(data.length).toEqual(1);
        },
        function(error) {
          expect(1).toEqual(2);
        }
      );

    });

    it('should return error on http fail', function() {
      $httpBackend.whenGET(apiUrl + "/todos").respond(500);

      todoFactory.getAll().then(
        function(data) {
          expect(1).toBe(2);
        },
        function(error) {
          expect(error).toBeDefined();
        }
      );
    });
  });

  // ADD TASK TEST
  describe('when add is called', function() {
    it('should add an object on success', function() {
      var task = {};
      var response = { 
        data: [{}, {}, {}]
      };

      $httpBackend.whenPOST(apiUrl + '/todos', task).respond(response);
      todoFactory.add(task).then(
        function(response) {
          expect(response.data.length).toEqual(4);
        },
        function(error) {
          expect(1).toEqual(2);
        }
      );
    });

    it('should return a error on failure', function() {
      var task = {};

      $httpBackend.whenPOST(apiUrl + '/todos', task).respond(500);
      todoFactory.add(task).then(
        function(response) {
          expect(response.data.length).toEqual(4);
        },
        function(error) {
          expect(error).toBeDefined();
        }
      );
    });
  });

  // REMOVE TASK TEST
  describe('when remove is called', function() {
    it('should remove an object on success', function() {
      var response = {
        data: [{}, {}, {}]
      }
      var todo = "Mark Matt";

      $httpBackend.whenDELETE(apiUrl + '/todos/' + todo.todoId).respond(response);
      todoFactory.remove(todo).then(
        function(response) {
          expect(response.data.length).toEqual(2);
        },
        function(error) {
          expect(1).toEqual(2);
        }
      );
    });

    it('should return a error on failure', function() {
      var todo = "Matt Mark";

      $httpBackend.whenDELETE(apiUrl + '/todos/' + todo.todoId).respond(500);
      todoFactory.remove(todo).then(
        function(response) {
          expect('what?');
        },
        function(error) {
          expect(error).toBeDefined();
        }
      );
    });
  });

  // UPDATE TEST
  describe('when update is called', function() {
    it('should remove an object on success', function() {
      var response = {
        data: "Origin"
      };

      var todo = "Not Origin";

      $httpBackend.whenPUT(apiUrl + '/todo/' + todo.todoId, todo).respond(response);
      todoFactory.update(todo).then(
        function(response) {
          expect(response.data).toEqual(todo);
        },
        function(error) {
          expect(1).toEqual(2);
        }
      );
    });

    it('should return a error on failure', function() {
      var todo = "Not Origin";

      $httpBackend.whenPUT(apiUrl + '/todos/' + todo.todoId).respond(500);
      todoFactory.update(todo).then(
        function(response) {
          expect('what?');
        },
        function(error) {
          expect(error).toBeDefined();
        }
      );
    });

  });

  // GET ID TEST
  describe('when getById is called', function() {
    it('should get the object by id on success', function() {
      var response = {
        data: {id: 1,
               msg: "hello world"
              }
      }
      var id = 1;

      $httpBackend.whenGET(apiUrl + '/todo/' + id).respond(response);
      todoFactory.getById(id).then(
        function(response) {
          expect(response.data.msg).toEqual("hello world");
        },
        function(error) {
          expect(1).toEqual(2);
        }
      );
    });

    it('should produce an error message on fail', function() {
      var id = 1;
      $httpBackend.whenGET(apiUrl + '/todo/' + id).respond(500);
      todoFactory.getById(id).then(
        function(response) {
          expect('what?');
        },
        function(error) {
          expect(error).toBeDefined();
        }
      );
    });
  });

});
