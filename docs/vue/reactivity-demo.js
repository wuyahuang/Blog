const targetMap = new WeakMap(); // 创建 targetMap，用于存储需要响应式的对象，当对象被更新时，触发对应的 effect 函数
let activeEffect = null;

//////////////////////////////////////////////////////////////////////
/*
 * targetMap + track + trigger
 */

// 追踪函数
function track(target, key) {
  // 判断是否是 activeEffect
  if (activeEffect) {
    // 从 targetMap 中查询目标对应的属性，如果不存在，新建一个 Map 用于存储依赖关系
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }

    // 从依赖图中查询 key 对应的 effect，如果不存在，新建一个 Set 用于存储 effect
    let dep = depsMap.get(key);

    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect); // 添加 effect 函数到 dependency map
  }
}

// 触发函数
function trigger(target, key) {
  // 从 targetMap 中查询目标关联的对象，如果不存在，直接 return
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }

  // 从 dependency map 中查询 key，如果存在，执行 key 对应的所有 effect 函数
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}

// 响应式函数
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key); // 只要对象触发 GET，则追踪该对象对应的 effect 函数
      return result;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target, key, value, receiver);
      if (result && oldValue != value) {
        trigger(target, key);// 对象被更新了，触发对应的 effect 函数
      }
      return result;
    }
  }
  return new Proxy(target, handler);
}

function ref(raw) {
  const r = {
    get value() {
      track(r, 'value');
      return raw;
    },
    set value(newVal) {
      raw = newVal;
      trigger(r, 'value');
    }
  }
  return r;
}

// activeEffect 用于确保 track 函数不会每次获取对象值都重复执行

function effect(eff) {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

function computed(getter) {
  let result = ref()

  effect(() => (result.value = getter()))

  return result
}

//////////////////////////////////////////////////////////////////////
/*
 * reactivity Test
 */

// 测试数据
let product = reactive({ price: 5, quantity: 2 })

let salePrice = computed(() => {
  return product.price * 0.9;
});

let total = computed(() => {
  return salePrice.value * product.quantity;
});

console.log("total: " + total.value, "salePrice: " + salePrice.value);

product.price = 20;
console.log("total: " + total.value, "salePrice: " + salePrice.value);
