const serviceInstancesMap = new Map();
const Injector = {};

Injector.inject = function inject(Service, factories = []) { 
  function InjectableService(...args) {
    factories.forEach((factory) => {
      if (!factory.single) {
        Object.defineProperty(this, factory.name, {
          value: factory.factory(...factory.args),
          configurable: false,
        });
      } else {
        Object.defineProperty(this, factory.name, {
          get() {
            if (serviceInstancesMap.has(factory.name) && factory.single) {
              return serviceInstancesMap.get(factory.name);
            }
      
            if (!serviceInstancesMap.has(factory.name) && factory.single) {
              const instance = factory.factory(...factory.args);
              serviceInstancesMap.set(factory.name, instance);
              return instance;
            }
          },

          configurable: false,
        });
      }
    }); 

    Service.apply(this, args);
  }

  return InjectableService;
};

Injector.injectable = function injectable(Service) {
  if (Service?.injectable) {
    throw new Error('Service already injectable');
  }

  const serviceName = validateServiceName();  

  Object.defineProperties(Service, {
    injectable: {
      value: true,
      configurable: false,
    },

    name: {
      value: serviceName,
      configurable: false,
    },
  });

  function validateServiceName() {
    const serviceName = Service?.name;

    if (!serviceName) {
      throw new Error('Can not get Service name');
    }
  
    return ((nameLikeArr) => {
      nameLikeArr[0] = nameLikeArr[0].toLowerCase();
      return `${nameLikeArr.join('')}`; 
    })(Array.from(serviceName));
  }
};

Injector.factory = function factory(Service, options = { args: [], single: false }) {
  if (!Service?.injectable) {
    throw new Error(`factory expected Service will be injectable, but is not`);
  }

  const single = !!options?.single;
  const args = Array.isArray(options?.args) ? options.args : [];
  
  const factory = {
    name: Service.name,
    factory: (..._args) => new Service(..._args),
    single,
    args,
  };

  return factory;
};

module.exports.Injector = Injector;
